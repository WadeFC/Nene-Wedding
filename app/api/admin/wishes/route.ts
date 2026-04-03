import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"
import { ResultSetHeader, RowDataPacket } from "mysql2"

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

// Verify admin password
function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return false
  }
  const token = authHeader.slice(7)
  return token === process.env.ADMIN_PASSWORD
}

// GET - Fetch all well wishes (admin)
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ wishes: [], message: "Database not configured" })
  }

  try {
    const [wishes] = await pool.execute<WellWish[]>(
      `SELECT id, name, message, image_url, is_approved, created_at 
       FROM well_wishes 
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

// DELETE - Delete a well wish
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
      `DELETE FROM well_wishes WHERE id = ?`,
      [parseInt(id)]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting well wish:", error)
    return NextResponse.json(
      { error: "Failed to delete well wish" },
      { status: 500 }
    )
  }
}
