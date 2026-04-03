import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message } = body

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("guestbook")
      .insert([
        {
          name,
          message,
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
      { error: "Server error" },
      { status: 500 }
    )
  }
}