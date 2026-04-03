import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"
import { ResultSetHeader, RowDataPacket } from "mysql2"

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

// Verify admin password
function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return false
  }
  const token = authHeader.slice(7)
  return token === process.env.ADMIN_PASSWORD
}

// GET - Fetch all gallery images (admin)
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ images: [], message: "Database not configured" })
  }

  try {
    const [images] = await pool.execute<GalleryImage[]>(
      `SELECT id, image_url, caption, uploaded_by, is_approved, is_featured, created_at 
       FROM gallery_images 
       ORDER BY created_at DESC`
    )

    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    )
  }
}

// DELETE - Delete a gallery image
export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await pool.execute<ResultSetHeader>(
      `DELETE FROM gallery_images WHERE id = ?`,
      [parseInt(id)]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting gallery image:", error)
    return NextResponse.json(
      { error: "Failed to delete gallery image" },
      { status: 500 }
    )
  }
}

// PATCH - Toggle approval or featured status
export async function PATCH(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { id, is_approved, is_featured } = body

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    if (is_approved !== undefined) {
      await pool.execute<ResultSetHeader>(
        `UPDATE gallery_images SET is_approved = ? WHERE id = ?`,
        [is_approved, id]
      )
    }

    if (is_featured !== undefined) {
      await pool.execute<ResultSetHeader>(
        `UPDATE gallery_images SET is_featured = ? WHERE id = ?`,
        [is_featured, id]
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating gallery image:", error)
    return NextResponse.json(
      { error: "Failed to update gallery image" },
      { status: 500 }
    )
  }
}
