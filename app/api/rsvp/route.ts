console.log("ADMIN PASSWORD:", process.env.ADMIN_PASSWORD)
import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// ======================
// SAVE RSVP
// ======================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      attendance,
      guestCount,
      dietaryRestrictions,
      message,
    } = body

    if (!name || !attendance) {
      return NextResponse.json(
        { error: "Name and attendance required" },
        { status: 400 }
      )
    }

    const { error } = await supabase.from("rsvps").insert([
      {
        name,
        email,
        attendance,
        guest_count: guestCount || 1,
        dietary_restrictions: dietaryRestrictions,
        message,
      },
    ])

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: "Failed to save RSVP" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "RSVP submitted successfully",
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}

// ======================
// ADMIN GET RSVPS
// ======================
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")

  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch RSVPs" },
      { status: 500 }
    )
  }

  return NextResponse.json({
    rsvps: data,
    stats: {
      total: data.length,
      attending: data.filter(r => r.attendance === "attending").length,
      not_attending: data.filter(r => r.attendance === "not-attending").length,
      maybe: data.filter(r => r.attendance === "maybe").length,
      total_guests: data
        .filter(r => r.attendance === "attending")
        .reduce((sum, r) => sum + (r.guest_count || 1), 0),
    },
  })
}