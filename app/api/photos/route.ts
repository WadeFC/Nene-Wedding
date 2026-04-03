import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// GET - Fetch approved gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let query = supabase
      .from("gallery_images")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })

    if (featured === "true") {
      query = query.eq("is_featured", true)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ images: data })
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    )
  }
}

// POST - Upload new gallery image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, caption, uploadedBy } = body

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("gallery_images")
      .insert([
        {
          image_url: imageUrl,
          caption: caption || null,
          uploaded_by: uploadedBy || null,
          is_approved: true,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully!",
        image: data[0],
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