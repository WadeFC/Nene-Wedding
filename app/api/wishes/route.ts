import { supabase } from "@/lib/supabase"

// POST - Submit a wish
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
      .from("wishes")
      .insert([
        {
          name,
          message,
        },
      ])

    if (error) throw error

    return Response.json({ success: true })
  } catch (err) {
    console.error(err)
    return Response.json(
      { error: "Failed to submit wish" },
      { status: 500 }
    )
  }
}

// GET - Fetch wishes
export async function GET() {
  const { data, error } = await supabase
    .from("wishes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error)
    return Response.json({ error }, { status: 500 })

  return Response.json(data)
}