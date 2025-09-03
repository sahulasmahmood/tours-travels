"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, Edit, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import BannerForm from "./BannerForm";

interface Banner {
  _id: string;
  pageName: string;
  image: string;
  status: string;
}

export default function BannersClient({ initialBanners = [] }) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAdd = () => {
    setSelectedBanner(null);
    setIsEditing(true);
  };

  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner);
    setIsEditing(true);
  };

  const handleDelete = async (banner: Banner) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/banner/${banner._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setBanners(banners.filter((b) => b._id !== banner._id));
        toast({
          title: "Success",
          description: "Banner deleted successfully",
        });
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

  const handleFormSubmit = async (formData: FormData, isEdit: boolean) => {
    try {
      setLoading(true);
      const url = isEdit
        ? `/api/admin/banner/${selectedBanner?._id}`
        : "/api/admin/banner";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        if (isEdit) {
          setBanners(
            banners.map((b) =>
              b._id === selectedBanner?._id ? data.data : b
            )
          );
        } else {
          setBanners([...banners, data.data]);
        }

        setIsEditing(false);
        toast({
          title: "Success",
          description: `Banner ${isEdit ? "updated" : "created"} successfully`,
        });
      } else {
        throw new Error(data.message || `Failed to ${isEdit ? "update" : "create"} banner`);
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

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Banner Management</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner) => (
          <Card key={banner._id}>
            <CardHeader className="relative">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={banner.image}
                  alt={banner.pageName}
                  fill
                  className="object-cover"
                />
              </div>
              <Badge variant={banner.status === "active" ? "default" : "secondary"}>
                {banner.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">{banner.pageName}</h3>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(banner)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedBanner(banner);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BannerForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleFormSubmit}
        banner={selectedBanner}
        loading={loading}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Banner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this banner? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedBanner && handleDelete(selectedBanner)}
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
