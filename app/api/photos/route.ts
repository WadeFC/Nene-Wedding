import { NextRequest, NextResponse } from "next/server"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import pool from "@/lib/db"

interface GalleryImage extends RowDataPacket {
  id: number
  image_url: string
  caption: string | null
  uploaded_by: string | null
  is_approved: boolean
  is_featured: boolean
  created_at: Date
}

// Check if database is configured
function isDatabaseConfigured() {
  return !!(process.env.MYSQL_HOST && process.env.MYSQL_USER && process.env.MYSQL_DATABASE)
}

// GET - Fetch all approved gallery images
export async function GET(request: NextRequest) {
  // Return empty array if database not configured
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ images: [], message: "Database not configured" })
  }

  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let sql = `SELECT id, image_url, caption, uploaded_by, created_at 
               FROM gallery_images 
               WHERE is_approved = TRUE`
    
    if (featured === "true") {
      sql += ` AND is_featured = TRUE`
    }
    
    sql += ` ORDER BY created_at DESC`

    const [images] = await pool.execute<GalleryImage[]>(sql)

    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    )
  }
}

// POST - Upload a new gallery image
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
    const { imageUrl, caption, uploadedBy } = body

    // Validation
    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      )
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO gallery_images (image_url, caption, uploaded_by, is_approved) 
       VALUES (?, ?, ?, TRUE)`,
      [imageUrl, caption || null, uploadedBy || null]
    )

    return NextResponse.json(
      { 
        success: true, 
        message: "Image uploaded successfully!",
        id: result.insertId 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    )
  }
}
