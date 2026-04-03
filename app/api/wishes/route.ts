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
      .from("wishes")
      .insert([{ name, message }])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to submit wish" },
      { status: 500 }
    )
  }
}