import { supabase } from "@/lib/supabase"

// Submit guestbook message
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, message } = body

    if (!name || !message) {
      return Response.json(
        { error: "Name and message required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("well_wishes")
      .insert([{ name, message }])

    if (error) throw error

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json(
      { error: "Failed to submit message" },
      { status: 500 }
    )
  }
}

// Fetch guestbook messages
export async function GET() {
  const { data, error } = await supabase
    .from("well_wishes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error)
    return Response.json({ error }, { status: 500 })

  return Response.json(data)
}