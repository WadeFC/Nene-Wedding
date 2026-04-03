"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  UserCheck,
  UserX,
  HelpCircle,
  Download,
  LogOut,
  MessageCircle,
  ImageIcon,
  Trash2,
} from "lucide-react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

interface RSVP {
  id: number
  name: string
  email: string
  attendance: "attending" | "not-attending" | "maybe"
  guest_count: number
  dietary_restrictions: string | null
  message: string | null
  created_at: string
}

interface WellWish {
  id: number
  name: string
  message: string
  image_url: string | null
  is_approved: boolean
  created_at: string
}

interface GalleryImage {
  id: number
  image_url: string
  caption: string | null
  uploaded_by: string | null
  is_approved: boolean
  is_featured: boolean
  created_at: string
}

interface Stats {
  total: number
  attending: number
  not_attending: number
  maybe: number
  total_guests: number
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [wellWishes, setWellWishes] = useState<WellWish[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("rsvps")

  const fetchAllData = async (token: string) => {
    try {
      // Fetch RSVPs
      const rsvpResponse = await fetch("/api/rsvp", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (rsvpResponse.ok) {
        const rsvpData = await rsvpResponse.json()
        setRsvps(rsvpData.rsvps)
        setStats(rsvpData.stats)
      }

      // Fetch Well Wishes
      const wishesResponse = await fetch("/api/admin/wishes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (wishesResponse.ok) {
        const wishesData = await wishesResponse.json()
        setWellWishes(wishesData.wishes || [])
      }

      // Fetch Gallery
      const galleryResponse = await fetch("/api/admin/photos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (galleryResponse.ok) {
        const galleryData = await galleryResponse.json()
        setGalleryImages(galleryData.images || [])
      }
    } catch (err) {
      console.error("Error fetching data:", err)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/rsvp", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      })

      if (!response.ok) {
        throw new Error("Invalid password")
      }

      const data = await response.json()
      setRsvps(data.rsvps)
      setStats(data.stats)
      setIsAuthenticated(true)
      sessionStorage.setItem("adminToken", password)

      // Fetch other data
      fetchAllData(password)
    } catch {
      setError("Invalid password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Check for existing session
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken")
    if (token) {
      setPassword(token)
      fetch("/api/rsvp", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error("Invalid token")
        })
        .then((data) => {
          setRsvps(data.rsvps)
          setStats(data.stats)
          setIsAuthenticated(true)
          fetchAllData(token)
        })
        .catch(() => {
          sessionStorage.removeItem("adminToken")
        })
    }
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
    setRsvps([])
    setWellWishes([])
    setGalleryImages([])
    setStats(null)
    sessionStorage.removeItem("adminToken")
  }

  const deleteWish = async (id: number) => {
    const token = sessionStorage.getItem("adminToken")
    try {
      await fetch(`/api/admin/wishes?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setWellWishes((prev) => prev.filter((w) => w.id !== id))
    } catch (err) {
      console.error("Error deleting wish:", err)
    }
  }

  const deleteGalleryImage = async (id: number) => {
    const token = sessionStorage.getItem("adminToken")
    try {
      await fetch(`/api/admin/photos?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setGalleryImages((prev) => prev.filter((img) => img.id !== id))
    } catch (err) {
      console.error("Error deleting image:", err)
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Attendance",
      "Guest Count",
      "Dietary Restrictions",
      "Message",
      "Submitted At",
    ]
    const csvContent = [
      headers.join(","),
      ...rsvps.map((rsvp) =>
        [
          `"${rsvp.name}"`,
          `"${rsvp.email}"`,
          rsvp.attendance,
          rsvp.guest_count,
          `"${rsvp.dietary_restrictions || ""}"`,
          `"${rsvp.message || ""}"`,
          new Date(rsvp.created_at).toLocaleString(),
        ].join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `wedding-rsvps-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getAttendanceBadge = (attendance: string) => {
    switch (attendance) {
      case "attending":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Attending
          </Badge>
        )
      case "not-attending":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Not Attending
          </Badge>
        )
      case "maybe":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Maybe
          </Badge>
        )
      default:
        return <Badge variant="secondary">{attendance}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">Admin Login</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Enter your admin password to manage your wedding
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </Field>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className="mr-2" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl">Wedding Admin</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total RSVPs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.attending}</p>
                    <p className="text-sm text-muted-foreground">Attending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <UserX className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {stats.not_attending}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Not Attending
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <HelpCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.maybe}</p>
                    <p className="text-sm text-muted-foreground">Maybe</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{stats.total_guests}</p>
                    <p className="text-sm text-muted-foreground">Total Guests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="rsvps" className="gap-2">
              <Users className="w-4 h-4" />
              RSVPs
            </TabsTrigger>
            <TabsTrigger value="wishes" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Well Wishes
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Gallery
            </TabsTrigger>
          </TabsList>

          {/* RSVPs Tab */}
          <TabsContent value="rsvps">
            <Card>
              <CardHeader>
                <CardTitle>Guest List</CardTitle>
              </CardHeader>
              <CardContent>
                {rsvps.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No RSVPs yet</p>
                    <p className="text-sm">
                      RSVPs will appear here as guests respond
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-center">Guests</TableHead>
                          <TableHead>Dietary Restrictions</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Submitted</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rsvps.map((rsvp) => (
                          <TableRow key={rsvp.id}>
                            <TableCell className="font-medium">
                              {rsvp.name}
                            </TableCell>
                            <TableCell>{rsvp.email}</TableCell>
                            <TableCell>
                              {getAttendanceBadge(rsvp.attendance)}
                            </TableCell>
                            <TableCell className="text-center">
                              {rsvp.guest_count}
                            </TableCell>
                            <TableCell className="max-w-[150px] truncate">
                              {rsvp.dietary_restrictions || "-"}
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {rsvp.message || "-"}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {formatDate(rsvp.created_at)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Well Wishes Tab */}
          <TabsContent value="wishes">
            <Card>
              <CardHeader>
                <CardTitle>Well Wishes ({wellWishes.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {wellWishes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No well wishes yet</p>
                    <p className="text-sm">
                      Messages will appear here as guests leave them
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wellWishes.map((wish) => (
                      <div
                        key={wish.id}
                        className="flex gap-4 p-4 bg-secondary/30 rounded-lg"
                      >
                        {wish.image_url && (
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={wish.image_url}
                              alt={`Photo from ${wish.name}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium">{wish.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(wish.created_at)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => deleteWish(wish.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="mt-2 text-muted-foreground">
                            {wish.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Images ({galleryImages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {galleryImages.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No images uploaded yet</p>
                    <p className="text-sm">
                      Photos will appear here as guests share them
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="group relative">
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={image.image_url}
                            alt={image.caption || "Gallery image"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                          onClick={() => deleteGalleryImage(image.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        {image.caption && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {image.caption}
                          </p>
                        )}
                        {image.uploaded_by && (
                          <p className="text-xs text-muted-foreground/70 truncate">
                            By {image.uploaded_by}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
