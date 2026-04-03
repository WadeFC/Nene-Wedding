import { NextRequest, NextResponse } from "next/server"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import pool from "@/lib/db"

interface WellWish extends RowDataPacket {
  id: number
  name: string
  message: string
  image_url: string | null
  is_approved: boolean
  created_at: Date
}

// Check if database is configured
function isDatabaseConfigured() {
  return !!(process.env.MYSQL_HOST && process.env.MYSQL_USER && process.env.MYSQL_DATABASE)
}

// GET - Fetch all approved well wishes
export async function GET() {
  // Return empty array if database not configured
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ wishes: [], message: "Database not configured" })
  }

  try {
    const [wishes] = await pool.execute<WellWish[]>(
      `SELECT id, name, message, image_url, created_at 
       FROM well_wishes 
       WHERE is_approved = TRUE 
       ORDER BY created_at DESC`
    )

    return NextResponse.json({ wishes })
  } catch (error) {
    console.error("Error fetching well wishes:", error)
    return NextResponse.json(
      { error: "Failed to fetch well wishes" },
      { status: 500 }
    )
  }
}

// POST - Create a new well wish
export async function POST(request: NextRequest) {
  // Return error if database not configured
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured. Please set up your MySQL connection." },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const { name, message, imageUrl } = body

    // Validation
    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      )
    }

    if (name.length > 255) {
      return NextResponse.json(
        { error: "Name must be less than 255 characters" },
        { status: 400 }
      )
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message must be less than 2000 characters" },
        { status: 400 }
      )
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO well_wishes (name, message, image_url, is_approved) 
       VALUES (?, ?, ?, TRUE)`,
      [name.trim(), message.trim(), imageUrl || null]
    )

    return NextResponse.json(
      { 
        success: true, 
        message: "Your well wish has been added!",
        id: result.insertId 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating well wish:", error)
    return NextResponse.json(
      { error: "Failed to submit well wish" },
      { status: 500 }
    )
  }
}
