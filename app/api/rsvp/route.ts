import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Check if database is configured
function isDatabaseConfigured() {
  return !!(process.env.MYSQL_HOST && process.env.MYSQL_USER && process.env.MYSQL_DATABASE)
}

export async function POST(request: NextRequest) {
  // Return error if database not configured
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured. Please set up your MySQL connection." },
      { status: 503 }
    )
  }

  try {
    const body = await request.json();
    const { name, attendance, guestCount, dietaryRestrictions, message } = body;

    // Validate required fields
    if (!name || !attendance) {
      return NextResponse.json(
        { error: 'Name and attendance are required' },
        { status: 400 }
      );
    }

    // Insert new RSVP
    await pool.query<ResultSetHeader>(
      `INSERT INTO rsvps (name, attendance, guest_count, dietary_restrictions, message) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, attendance, guestCount || 1, dietaryRestrictions || null, message || null]
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your RSVP!' 
    });

  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit RSVP. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Return empty if database not configured
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ 
      rsvps: [], 
      stats: { total: 0, attending: 0, not_attending: 0, maybe: 0, total_guests: 0 },
      message: "Database not configured" 
    })
  }

  try {
    // Check admin authentication
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM rsvps ORDER BY created_at DESC'
    );

    // Get summary stats
    const [stats] = await pool.query<RowDataPacket[]>(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN attendance = 'attending' THEN 1 ELSE 0 END) as attending,
        SUM(CASE WHEN attendance = 'not-attending' THEN 1 ELSE 0 END) as not_attending,
        SUM(CASE WHEN attendance = 'maybe' THEN 1 ELSE 0 END) as maybe,
        SUM(CASE WHEN attendance = 'attending' THEN guest_count ELSE 0 END) as total_guests
      FROM rsvps
    `);

    return NextResponse.json({
      rsvps: rows,
      stats: stats[0]
    });

  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSVPs' },
      { status: 500 }
    );
  }
}
