import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

/* ---------------- POST RSVP ---------------- */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, attendance, guestCount, dietaryRestrictions, message } = body

    if (!name || !attendance) {
      return NextResponse.json(
        { error: "Name and attendance are required" },
        { status: 400 }
      )
    }

    const { error } = await supabase.from("rsvps").insert({
      name,
      attendance,
      guest_count: guestCount || 1,
      dietary_restrictions: dietaryRestrictions || null,
      message: message || null,
    })

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: "Failed to submit RSVP" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your RSVP!",
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}

/* ---------------- GET RSVPS (ADMIN) ---------------- */

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: rsvps, error } = await supabase
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

    const stats = {
      total: rsvps.length,
      attending: rsvps.filter(r => r.attendance === "attending").length,
      not_attending: rsvps.filter(r => r.attendance === "not-attending").length,
      maybe: rsvps.filter(r => r.attendance === "maybe").length,
      total_guests: rsvps
        .filter(r => r.attendance === "attending")
        .reduce((sum, r) => sum + (r.guest_count || 0), 0),
    }

    return NextResponse.json({
      rsvps,
      stats,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}