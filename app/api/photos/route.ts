import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/db"

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

// POST wish
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, message } = body

  const { data, error } = await supabase
    .from("well_wishes")
    .insert([{ name, message }])

  if (error) {
    console.error(error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, wish: data })
}