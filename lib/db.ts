import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Helper function to execute queries with proper typing
export async function query<T>(sql: string, params?: unknown[]): Promise<T> {
  const [results] = await pool.execute(sql, params)
  return results as T
}

export interface RSVP {
  id: number
  name: string
  email: string
  attendance: "attending" | "not-attending" | "maybe"
  guest_count: number
  dietary_restrictions: string | null
  message: string | null
  created_at: Date
  updated_at: Date
}

export interface WellWish {
  id: number
  name: string
  message: string
  image_url: string | null
  is_approved: boolean
  created_at: Date
}

export interface GalleryImage {
  id: number
  image_url: string
  caption: string | null
  uploaded_by: string | null
  is_approved: boolean
  is_featured: boolean
  created_at: Date
}

export default pool
