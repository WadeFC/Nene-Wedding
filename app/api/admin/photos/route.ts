import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/db"

function isAuthorized(request: NextRequest) {
  const auth = request.headers.get("authorization")
  const token = auth?.replace("Bearer ", "")
  return token === process.env.ADMIN_PASSWORD
}

// GET images
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    )
  }

  return NextResponse.json({ images: data || [] })
}

// DELETE image
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 })
  }

  const { error } = await supabase
    .from("gallery_images")
    .delete()
    .eq("id", id)

  if (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}