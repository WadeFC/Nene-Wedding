import { NextResponse } from "next/server"

// This route has been moved to /api/wishes
export async function GET() {
  return NextResponse.json({ message: "Route moved to /api/wishes" })
}

export async function POST() {
  return NextResponse.json({ message: "Route moved to /api/wishes" })
}
