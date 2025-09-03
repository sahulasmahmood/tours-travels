"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger, 
  SelectValue, 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

interface Banner {
  _id: string;
  pageName: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PAGE_ORDER = ["home", "about", "tariff", "packages", "contact"];

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch banners
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/banner", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setBanners(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch banners");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const url = selectedBanner
        ? `/api/admin/banner/${selectedBanner._id}`
        : "/api/admin/banner";
      const method = selectedBanner ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: `Banner ${selectedBanner ? "updated" : "created"} successfully`,
        });
        setIsDialogOpen(false);
        fetchBanners();
      } else {
        throw new Error(data.message || `Failed to ${selectedBanner ? "update" : "create"} banner`);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedBanner) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/banner/${selectedBanner._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Banner deleted successfully",
        });
        fetchBanners();
      } else {
        throw new Error(data.message || "Failed to delete banner");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner);
    setPreviewImage(banner.image);
    setIsDialogOpen(true);
  };

  // Removed handleAdd as we're using seeded banners

  const sortedBanners = [...banners].sort((a, b) => {
    const aIdx = PAGE_ORDER.indexOf(a.pageName);
    const bIdx = PAGE_ORDER.indexOf(b.pageName);
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-admin-gradient bg-clip-text text-transparent">
            Banner Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage banner visibility for different pages of your website
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-admin-gradient bg-clip-text text-transparent">
                Edit Banner - {selectedBanner ? (selectedBanner.pageName.charAt(0).toUpperCase() + selectedBanner.pageName.slice(1) + " Page") : ""}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="py-4">
              <div className="flex flex-row gap-8 items-start">
                {/* Left: Status Selector */}
                <div className="flex-1 min-w-[220px]">
                  <Label htmlFor="status" className="text-base font-semibold mb-2 block">
                    Status <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="status"
                    defaultValue={selectedBanner?.status || "active"}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="pageName" value={selectedBanner?.pageName || ""} />
                </div>
                {/* Right: Banner Image Upload & Preview */}
                <div className="flex-1 min-w-[320px]">
                  <Label htmlFor="file" className="text-base font-semibold mb-2 block">
                    Banner Image
                  </Label>
                  <Input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1 mb-4"
                  />
                  {previewImage && (
                    <div className="aspect-[16/10] relative rounded-lg overflow-hidden border bg-muted">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="bg-admin-gradient text-white hover:bg-admin-gradient/90">
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Update Banner
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Banner List - Horizontal Cards with Image Left */}
      <div className="grid gap-6">
        {Array.isArray(sortedBanners) && sortedBanners.map((banner) => (
          <Card key={banner._id} className="shadow-xl border-0">
            <CardContent className="p-10">
              <div className="flex gap-8">
                {/* Left Side - Banner Image */}
                <div className="flex-shrink-0">
                  <div className="w-96 h-72 rounded-lg overflow-hidden border">
                    <Image
                      src={banner.image || "/placeholder.jpg"}
                      alt={banner.pageName}
                      width={384}
                      height={288}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Right Side - Banner Content */}
                <div className="flex-1 flex justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold text-gray-900 capitalize">{banner.pageName} Page</h3>
                      <Badge
                        variant={banner.status === "active" ? "default" : "secondary"}
                        className={banner.status === "active" ? "bg-admin-gradient text-white" : ""}
                      >
                        {banner.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Last updated: {new Date(banner.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button variant="outline" size="lg" onClick={() => handleEdit(banner)}>
                      <Edit className="w-5 h-5 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Banner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this banner? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete Banner
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
