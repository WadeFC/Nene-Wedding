import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// GET wishes
export async function GET() {
  const { data, error } = await supabase
    .from("well_wishes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch wishes" },
      { status: 500 }
    )
  }

  return NextResponse.json({ wishes: data })
}

// POST new wish
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message, imageUrl } = body

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message required" },
        { status: 400 }
      )
    }

    const { error } = await supabase.from("well_wishes").insert([
      {
        name,
        message,
        image_url: imageUrl || null,
        is_approved: true,
      },
    ])

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: "Database insert failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to submit wish" },
      { status: 500 }
    )
  }
}