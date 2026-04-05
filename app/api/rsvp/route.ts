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

    const { data, error } = await supabase
      .from("rsvps")
      .insert([
        {
          name,
          attendance,
          guest_count: guestCount ?? 1,
          dietary_restrictions: dietaryRestrictions ?? null,
          message: message ?? null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error)

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      rsvp: data,
    })
  } catch (err) {
    console.error("SERVER ERROR:", err)

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
  try {
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
      console.error("FETCH RSVP ERROR:", error)

      return NextResponse.json(
        { error: error.message },
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
  } catch (err) {
    console.error("ADMIN FETCH ERROR:", err)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}