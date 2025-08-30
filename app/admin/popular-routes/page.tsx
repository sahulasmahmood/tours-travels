"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Save, X, MapPin } from "lucide-react"

type PopularRoute = {
  _id?: string
  label: string
  city?: string
  note?: string
  status: "active" | "inactive"
  featured: boolean
}

export default function PopularRoutesAdminPage() {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const scrollRef = useRef<number>(0)

  // Static sample items (frontend only)
  const sample: PopularRoute[] = [
    { _id: "1", label: "Madurai Drop Taxi", city: "Madurai", status: "active", featured: true },
    { _id: "2", label: "Chennai Drop Taxi", city: "Chennai", status: "active", featured: true },
    { _id: "3", label: "Coimbatore Drop Taxi", city: "Coimbatore", status: "active", featured: false },
    { _id: "4", label: "Kanchipuram Drop Taxi", city: "Kanchipuram", status: "active", featured: false },
  ]

  const [routes, setRoutes] = useState<PopularRoute[]>(sample)

  const [form, setForm] = useState<PopularRoute>({
    label: "",
    city: "",
    note: "",
    status: "active",
    featured: false,
  })

  const openAdd = () => {
    scrollRef.current = window.scrollY
    setEditingId(null)
    setForm({ label: "", city: "", note: "", status: "active", featured: false })
    setIsOpen(true)
  }

  const openEdit = (r: PopularRoute) => {
    scrollRef.current = window.scrollY
    setEditingId(r._id || null)
    setForm({ label: r.label, city: r.city, note: r.note, status: r.status, featured: r.featured })
    setIsOpen(true)
  }

  const save = async () => {
    if (!form.label.trim()) {
      toast({ title: "Validation Error", description: "Route label is required", variant: "destructive" })
      return
    }
    setIsSaving(true)
    try {
      // Frontend-only simulation
      if (editingId) {
        setRoutes((prev) => prev.map((r) => (r._id === editingId ? { ...r, ...form } : r)))
        toast({ title: "Popular Route Updated", description: "Changes saved successfully." })
      } else {
        const newItem: PopularRoute = { ...form, _id: Date.now().toString() }
        setRoutes((prev) => [newItem, ...prev])
        toast({ title: "Popular Route Added", description: "Route added successfully." })
      }
      setIsOpen(false)
    } finally {
      setIsSaving(false)
      requestAnimationFrame(() => window.scrollTo({ top: scrollRef.current, behavior: "instant" as any }))
    }
  }

  const confirmDelete = (id: string) => setDeletingId(id)

  const remove = async () => {
    if (!deletingId) return
    setIsDeleting(true)
    try {
      setRoutes((prev) => prev.filter((r) => r._id !== deletingId))
      toast({ title: "Popular Route Deleted", description: "Route removed successfully." })
      setDeletingId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-admin-gradient bg-clip-text text-transparent">
            Popular Routes Management
          </h1>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd} className="bg-admin-gradient text-white border-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Popular Route
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="text-2xl bg-admin-gradient bg-clip-text text-transparent">
                {editingId ? "Edit Route" : "Add Popular Route"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-4">
              <div>
                <Label className="text-base font-semibold">Label *</Label>
                <Input
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="e.g., Madurai Drop Taxi"
                  className="mt-2"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-base font-semibold">City</Label>
                  <Input
                    value={form.city || ""}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g., Madurai"
                    className="mt-2"
                  />
                </div>
                <div className="flex items-center gap-2 mt-7">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="featured" className="text-base font-semibold">
                    Featured
                  </Label>
                </div>
              </div>
              <div>
                <Label className="text-base font-semibold">Note (optional)</Label>
                <Textarea
                  value={form.note || ""}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Short internal note"
                  rows={3}
                  className="mt-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button onClick={save} disabled={isSaving} className="bg-admin-gradient text-white">
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid of routes (static) */}
      <Card className="border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {routes.map((r) => (
              <div
                key={r._id}
                className="flex items-center justify-between gap-3 rounded-full border px-4 py-3 bg-white"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 truncate">{r.label}</div>
                    {r.city && <div className="text-xs text-gray-500 truncate">{r.city}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {r.featured && <Badge className="bg-yellow-500 text-yellow-900">Featured</Badge>}
                  <Button size="sm" variant="outline" onClick={() => openEdit(r)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => confirmDelete(r._id!)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this route?</AlertDialogTitle>
            <AlertDialogDescription>
              This is a frontend-only preview. Deleting will remove the item from the current session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={remove} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
