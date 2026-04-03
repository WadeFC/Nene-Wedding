import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

function verifyAuth(request: NextRequest) {
  const auth = request.headers.get("authorization")
  return auth === `Bearer ${process.env.ADMIN_PASSWORD}`
}

// GET wishes
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("well_wishes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ wishes: data })
}

// DELETE wish
export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  await supabase.from("well_wishes").delete().eq("id", id)

  return NextResponse.json({ success: true })
}