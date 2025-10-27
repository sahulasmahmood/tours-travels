"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Save,
  X,
  Car,
  Upload,
  Loader2,
  IndianRupee,
  Clock,
  MapPin
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TariffService {
  _id?: string;
  vehicleType: string;
  vehicleName: string;
  description: string;
  oneWayRate: string;
  roundTripRate: string;
  driverAllowance: string;
  minimumKmOneWay: string;
  minimumKmRoundTrip: string;
  image: string;
  status: string;
  featured: boolean;
  additionalCharges: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalServices: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function TariffPage() {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [services, setServices] = useState<TariffService[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingButtonId, setDeletingButtonId] = useState<string | null>(null);
  const scrollPositionRef = useRef<number>(0);

  // Vehicle Type Management States
  const [vehicleTypes, setVehicleTypes] = useState<{ _id: string; name: string }[]>([
    { _id: "1", name: "Sedan" },
    { _id: "2", name: "SUV" },
    { _id: "3", name: "Premium" },
    { _id: "4", name: "Luxury" },
    { _id: "5", name: "Tempo" }
  ]);
  const [newVehicleTypeName, setNewVehicleTypeName] = useState("");
  const [showAddVehicleType, setShowAddVehicleType] = useState(false);
  const [editingVehicleType, setEditingVehicleType] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [editVehicleTypeName, setEditVehicleTypeName] = useState("");
  const [deletingVehicleTypeId, setDeletingVehicleTypeId] = useState<string | null>(null);
  const [vehicleTypeDropdownOpen, setVehicleTypeDropdownOpen] = useState(false);
  const [explicitlyClosing, setExplicitlyClosing] = useState(false);

  // Fetch tariff services from API
  const fetchServices = async (page = 1) => {
    try {
      setLoading(true);
      
      // Get JWT token from localStorage
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.get(`/api/admin/tariff?page=${page}&limit=6`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        setServices(response.data.data);
        setPagination(response.data.pagination);
        setCurrentPage(page);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch tariff services",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tariff services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalServices: 0,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Fetch vehicle types from API
  const fetchVehicleTypes = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await axios.get('/api/admin/vehicle-types', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setVehicleTypes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
      toast({
        title: "Error",
        description: "Failed to fetch vehicle types",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
    fetchVehicleTypes();
  }, [currentPage]);

  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleName: "",
    description: "",
    oneWayRate: "",
    roundTripRate: "",
    driverAllowance: "",
    minimumKmOneWay: "",
    minimumKmRoundTrip: "",
    image: "",
    status: "active",
    featured: false,
    additionalCharges: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  // Check if maximum featured services limit reached (3 featured services max)
  const maxFeaturedReached =
    services.filter((service) => service.featured).length >= 3;

  const handleEdit = (service: TariffService) => {
    scrollPositionRef.current = window.scrollY;
    
    setEditingId(service._id || null);
    setFormData({
      vehicleType: service.vehicleType,
      vehicleName: service.vehicleName,
      description: service.description,
      oneWayRate: service.oneWayRate,
      roundTripRate: service.roundTripRate,
      driverAllowance: service.driverAllowance,
      minimumKmOneWay: service.minimumKmOneWay,
      minimumKmRoundTrip: service.minimumKmRoundTrip,
      image: service.image,
      status: service.status,
      featured: service.featured,
      additionalCharges: service.additionalCharges.join(", "),
      seoTitle: service.seoTitle,
      seoDescription: service.seoDescription,
      seoKeywords: service.seoKeywords,
    });
    setSelectedFiles({
      mainImage: null,
    });
    setIsAddModalOpen(true);
  };

  const handleSave = async () => {
    setIsFormSubmitted(true);
    setIsSaving(true);

    // Validate required fields (only minimal required fields)
    if (
      !formData.vehicleType ||
      !formData.vehicleName ||
      !formData.image
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in vehicle type, vehicle name, and upload an image.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    try {
      // Get JWT token from localStorage first
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again to continue.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      // Prepare form data for submission (including files)
      const submitFormData = new FormData();
      
      // Add all text fields
      submitFormData.append('vehicleType', formData.vehicleType.trim());
      submitFormData.append('vehicleName', formData.vehicleName.trim());
      submitFormData.append('description', formData.description.trim());
      submitFormData.append('oneWayRate', formData.oneWayRate.trim());
      submitFormData.append('roundTripRate', formData.roundTripRate.trim());
      submitFormData.append('driverAllowance', formData.driverAllowance.trim());
      submitFormData.append('minimumKmOneWay', formData.minimumKmOneWay.trim());
      submitFormData.append('minimumKmRoundTrip', formData.minimumKmRoundTrip.trim());
      submitFormData.append('featured', formData.featured.toString());
      submitFormData.append('status', formData.status);
      submitFormData.append('seoTitle', formData.seoTitle.trim());
      submitFormData.append('seoDescription', formData.seoDescription.trim());
      submitFormData.append('seoKeywords', formData.seoKeywords.trim());
      
      // Add existing image URL if no new file selected
      if (!selectedFiles.mainImage && formData.image) {
        submitFormData.append('existingImage', formData.image);
      }
      
      // Add new main image file if selected
      if (selectedFiles.mainImage) {
        submitFormData.append('mainImage', selectedFiles.mainImage);
      }
      
      // Add arrays as JSON strings
      submitFormData.append('additionalCharges', JSON.stringify(
        formData.additionalCharges.split(",").map((f) => f.trim()).filter((f) => f)
      ));

      const url = editingId
        ? `/api/admin/tariff/${editingId}`
        : "/api/admin/tariff";
      const method = editingId ? "put" : "post";

      const response = await axios[method](url, submitFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast({
          title: editingId ? "Service Updated" : "Service Added",
          description: `Tariff service has been successfully ${
            editingId ? "updated" : "added"
          }.`,
        });
        fetchServices(currentPage);
        fetchVehicleTypes(); // Refresh vehicle types in case a new one was used
        handleCancel();
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to save tariff service",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save tariff service",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeletingServiceId(id);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    setDeletingButtonId(id);
    
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again to continue.",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.delete(`/api/admin/tariff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast({
          title: "Service Deleted",
          description: "Tariff service has been successfully deleted.",
        });
        setDeletingServiceId(null);

        // Check if we need to go back to previous page
        const remainingServices = Array.isArray(services) ? services.filter((s) => s._id !== id) : [];
        if (remainingServices.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchServices(currentPage);
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to delete tariff service",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tariff service",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeletingButtonId(null);
    }
  };

  // Vehicle Type Management Functions
  const handleAddVehicleType = async () => {
    if (!newVehicleTypeName.trim()) {
      toast({
        title: "Error",
        description: "Vehicle type name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.post('/api/admin/vehicle-types', 
        { name: newVehicleTypeName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Vehicle Type Added",
          description: "New vehicle type has been successfully added.",
        });
        
        // Refresh vehicle types list
        await fetchVehicleTypes();
        
        setNewVehicleTypeName("");
        setShowAddVehicleType(false);
        setExplicitlyClosing(true);
        setVehicleTypeDropdownOpen(false);
        
        // Auto-select the newly added vehicle type
        setFormData({ ...formData, vehicleType: response.data.data.name });
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to add vehicle type",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add vehicle type",
        variant: "destructive",
      });
    }
  };

  const handleEditVehicleType = async () => {
    if (!editVehicleTypeName.trim() || !editingVehicleType) {
      toast({
        title: "Error",
        description: "Vehicle type name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.put(
        `/api/admin/vehicle-types/${editingVehicleType.id}`,
        { name: editVehicleTypeName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Vehicle Type Updated",
          description: "Vehicle type has been successfully updated.",
        });
        
        // Refresh vehicle types list
        await fetchVehicleTypes();
        
        setEditingVehicleType(null);
        setEditVehicleTypeName("");
        setExplicitlyClosing(true);
        setVehicleTypeDropdownOpen(false);
        
        // Update form data if the edited vehicle type was selected
        if (formData.vehicleType === editingVehicleType.name) {
          setFormData({ ...formData, vehicleType: response.data.data.name });
        }
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to update vehicle type",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update vehicle type",
        variant: "destructive",
      });
    }
  };

  const handleDeleteVehicleType = async (vehicleTypeId: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const vehicleTypeToDelete = vehicleTypes.find(type => type._id === vehicleTypeId);
      
      // Check if any services are using this vehicle type
      const servicesUsingType = services.filter(
        service => service.vehicleType === vehicleTypeToDelete?.name
      );

      if (servicesUsingType.length > 0) {
        toast({
          title: "Cannot Delete",
          description: `This vehicle type is used by ${servicesUsingType.length} service(s). Please update or delete those services first.`,
          variant: "destructive",
        });
        setDeletingVehicleTypeId(null);
        return;
      }

      const response = await axios.delete(`/api/admin/vehicle-types/${vehicleTypeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast({
          title: "Vehicle Type Deleted",
          description: "Vehicle type has been successfully deleted.",
        });
        
        // Refresh vehicle types list
        await fetchVehicleTypes();
        
        setDeletingVehicleTypeId(null);
        
        // Clear form data if the deleted vehicle type was selected
        if (formData.vehicleType === vehicleTypeToDelete?.name) {
          setFormData({ ...formData, vehicleType: "" });
        }
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to delete vehicle type",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete vehicle type",
        variant: "destructive",
      });
      setDeletingVehicleTypeId(null);
    }
  };

  const handleCancelAddVehicleType = () => {
    setShowAddVehicleType(false);
    setNewVehicleTypeName("");
    setExplicitlyClosing(true);
    setVehicleTypeDropdownOpen(false);
  };

  const handleCancel = () => {
    const savedScrollPosition = scrollPositionRef.current;
    
    setIsAddModalOpen(false);
    setEditingId(null);
    setFormData({
      vehicleType: "",
      vehicleName: "",
      description: "",
      oneWayRate: "",
      roundTripRate: "",
      driverAllowance: "",
      minimumKmOneWay: "",
      minimumKmRoundTrip: "",
      image: "",
      status: "active",
      featured: false,
      additionalCharges: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setSelectedFiles({
      mainImage: null,
    });
    
    requestAnimationFrame(() => {
      window.scrollTo({ 
        top: savedScrollPosition, 
        behavior: "instant" 
      });
    });
  };

  const [selectedFiles, setSelectedFiles] = useState<{
    mainImage: File | null;
  }>({
    mainImage: null,
  });

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        setSelectedFiles((prev) => ({ ...prev, mainImage: files[0] }));
        const previewUrl = URL.createObjectURL(files[0]);
        setFormData((prev) => ({ ...prev, image: previewUrl }));

        toast({
          title: "Image Selected",
          description: "Vehicle image selected. Click Save to upload.",
        });
      }
    };
    input.click();
  };

  // Add pagination rendering function
  const renderPaginationItems = () => {
    if (!pagination) return [];
    
    const items = [];
    const { currentPage, totalPages } = pagination;

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(currentPage - 1)}
          className={
            !pagination.hasPrevPage
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    // Page numbers
    if (totalPages <= 7) {
      // Show all pages if total pages are 7 or less
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`cursor-pointer ${
                currentPage === i
                  ? "bg-admin-gradient text-white border-0 hover:bg-admin-gradient"
                  : ""
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            className={`cursor-pointer ${
              currentPage === 1
                ? "bg-admin-gradient text-white border-0 hover:bg-admin-gradient"
                : ""
            }`}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`cursor-pointer ${
                currentPage === i
                  ? "bg-admin-gradient text-white border-0 hover:bg-admin-gradient"
                  : ""
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className={`cursor-pointer ${
              currentPage === totalPages
                ? "bg-admin-gradient text-white border-0 hover:bg-admin-gradient"
                : ""
            }`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => handlePageChange(currentPage + 1)}
          className={
            !pagination.hasNextPage
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  // Add page change handler
  const handlePageChange = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tariff services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-admin-gradient bg-clip-text text-transparent">
            Tariff Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your vehicle tariff services with pricing and descriptions
          </p>
        </div>

        <Dialog
          open={isAddModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsFormSubmitted(false);
              const savedScrollPosition = scrollPositionRef.current;
              handleCancel();
              
              setTimeout(() => {
                window.scrollTo({ 
                  top: savedScrollPosition, 
                  behavior: "instant" 
                });
              }, 50);
            } else {
              scrollPositionRef.current = window.scrollY;
            }
            setIsAddModalOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                scrollPositionRef.current = window.scrollY;
                setEditingId(null);
                setFormData({
                  vehicleType: "",
                  vehicleName: "",
                  description: "",
                  oneWayRate: "",
                  roundTripRate: "",
                  driverAllowance: "",
                  minimumKmOneWay: "",
                  minimumKmRoundTrip: "",
                  image: "",
                  status: "active",
                  featured: false,
                  additionalCharges: "",
                  seoTitle: "",
                  seoDescription: "",
                  seoKeywords: "",
                });
                setSelectedFiles({
                  mainImage: null,
                });
                setIsAddModalOpen(true);
              }}
              className="bg-admin-gradient text-white border-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>  
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="text-2xl bg-admin-gradient bg-clip-text text-transparent">
                {editingId ? "Edit Tariff Service" : "Add New Tariff Service"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-8 p-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  Vehicle Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Label className="text-base font-semibold">
                      Vehicle Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-2 space-y-2">
                      <Select
                        value={formData.vehicleType}
                        onValueChange={(value) => {
                          if (value === "add_new_vehicle_type") {
                            // This case should not happen now since we're not using SelectItem for add new vehicle type
                            setEditingVehicleType(null);
                            setEditVehicleTypeName("");
                            setShowAddVehicleType(true);
                            setNewVehicleTypeName("");
                            setVehicleTypeDropdownOpen(true);
                          } else {
                            setFormData({ ...formData, vehicleType: value });
                            setVehicleTypeDropdownOpen(false);
                          }
                        }}
                        open={vehicleTypeDropdownOpen}
                        onOpenChange={(open) => {
                          if (
                            !open &&
                            (editingVehicleType || showAddVehicleType) &&
                            !explicitlyClosing
                          ) {
                            // Force it to stay open when we're in add/edit mode
                            setVehicleTypeDropdownOpen(true);
                            return;
                          }
                          setVehicleTypeDropdownOpen(open);
                          if (explicitlyClosing) {
                            setExplicitlyClosing(false);
                          }
                          // Reset states when dropdown closes naturally
                          if (!open && !explicitlyClosing) {
                            setShowAddVehicleType(false);
                            setEditingVehicleType(null);
                            setNewVehicleTypeName("");
                            setEditVehicleTypeName("");
                          }
                        }}
                      >
                        <SelectTrigger className={`w-full ${
                          isFormSubmitted && !formData.vehicleType
                            ? "ring-1 ring-red-500 focus:ring-2 focus:ring-red-500"
                            : ""
                        }`}>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent className="z-50" data-no-search="true">
                          {vehicleTypes.map((vehicleType) => (
                            <div
                              key={vehicleType._id}
                              className="flex items-center justify-between group"
                            >
                              <SelectItem
                                value={vehicleType.name}
                                className="flex-1"
                              >
                                {vehicleType.name}
                              </SelectItem>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-blue-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAddVehicleType(false);
                                    setNewVehicleTypeName("");
                                    setEditingVehicleType({
                                      id: vehicleType._id,
                                      name: vehicleType.name,
                                    });
                                    setEditVehicleTypeName(vehicleType.name);
                                    setVehicleTypeDropdownOpen(true);
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-red-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeletingVehicleTypeId(vehicleType._id);
                                  }}
                                >
                                  <Trash2 className="h-3 w-3 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}

                          <div
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1.5 text-sm flex items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setEditingVehicleType(null);
                              setEditVehicleTypeName("");
                              setShowAddVehicleType(true);
                              setNewVehicleTypeName("");
                              // Don't change vehicleTypeDropdownOpen here - let it stay open
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Vehicle Type
                          </div>

                          {showAddVehicleType && (
                            <div
                              className="p-4 border-t bg-gray-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <Label className="text-sm font-semibold">
                                  Add New Vehicle Type
                                </Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={handleCancelAddVehicleType}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  value={newVehicleTypeName}
                                  onChange={(e) =>
                                    setNewVehicleTypeName(e.target.value)
                                  }
                                  placeholder="Enter vehicle type name"
                                  className="flex-1"
                                  autoFocus
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      handleAddVehicleType();
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    // Prevent the Select component from capturing these key events
                                    e.stopPropagation();
                                  }}
                                  onFocus={(e) => {
                                    // Prevent Select from treating this as search input
                                    e.stopPropagation();
                                  }}
                                />
                                <Button
                                  type="button"
                                  onClick={handleAddVehicleType}
                                  size="sm"
                                  className="bg-admin-gradient text-white"
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          )}

                          {editingVehicleType && (
                            <div
                              className="p-4 border-t bg-gray-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <Label className="text-sm font-semibold">
                                  Edit Vehicle Type
                                </Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingVehicleType(null);
                                    setEditVehicleTypeName("");
                                    setExplicitlyClosing(true);
                                    setVehicleTypeDropdownOpen(false);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  value={editVehicleTypeName}
                                  onChange={(e) =>
                                    setEditVehicleTypeName(e.target.value)
                                  }
                                  placeholder="Enter vehicle type name"
                                  className="flex-1"
                                  autoFocus
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      handleEditVehicleType();
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    // Prevent the Select component from capturing these key events
                                    e.stopPropagation();
                                  }}
                                  onFocus={(e) => {
                                    // Prevent Select from treating this as search input
                                    e.stopPropagation();
                                  }}
                                />
                                <Button
                                  type="button"
                                  onClick={handleEditVehicleType}
                                  size="sm"
                                  className="bg-admin-gradient text-white"
                                >
                                  <Save className="h-4 w-4 mr-1" />
                                  Save
                                </Button>
                              </div>
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      {isFormSubmitted && !formData.vehicleType && (
                        <p className="text-sm text-red-500 mt-1">
                          Vehicle type is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="vehicleName" className="text-base font-semibold">
                      Vehicle Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="vehicleName"
                      value={formData.vehicleName}
                      onChange={(e) =>
                        setFormData({ ...formData, vehicleName: e.target.value })
                      }
                      placeholder="e.g., Sedan (Dzire/Etios)"
                      className={`mt-2 ${
                        isFormSubmitted && !formData.vehicleName
                          ? "ring-1 ring-red-500 focus:ring-2 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    {isFormSubmitted && !formData.vehicleName && (
                      <p className="text-sm text-red-500 mt-1">
                        Vehicle name is required
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-base font-semibold">
                    Description <span className="text-gray-500">(Optional)</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Detailed description of the vehicle and its features"
                    rows={4}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Pricing Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  Pricing Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="oneWayRate" className="text-base font-semibold">
                      One Way Rate <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="oneWayRate"
                      type="number"
                      value={formData.oneWayRate}
                      onChange={(e) =>
                        setFormData({ ...formData, oneWayRate: e.target.value })
                      }
                      placeholder="14"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="roundTripRate" className="text-base font-semibold">
                      Round Trip Rate <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="roundTripRate"
                      type="number"
                      value={formData.roundTripRate}
                      onChange={(e) =>
                        setFormData({ ...formData, roundTripRate: e.target.value })
                      }
                      placeholder="13"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="driverAllowance" className="text-base font-semibold">
                      Driver Allowance <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="driverAllowance"
                      type="number"
                      value={formData.driverAllowance}
                      onChange={(e) =>
                        setFormData({ ...formData, driverAllowance: e.target.value })
                      }
                      placeholder="400"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimumKmOneWay" className="text-base font-semibold">
                      Min KM (One Way) <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="minimumKmOneWay"
                      type="number"
                      value={formData.minimumKmOneWay}
                      onChange={(e) =>
                        setFormData({ ...formData, minimumKmOneWay: e.target.value })
                      }
                      placeholder="130"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimumKmRoundTrip" className="text-base font-semibold">
                      Min KM (Round Trip) <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="minimumKmRoundTrip"
                      type="number"
                      value={formData.minimumKmRoundTrip}
                      onChange={(e) =>
                        setFormData({ ...formData, minimumKmRoundTrip: e.target.value })
                      }
                      placeholder="250"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalCharges" className="text-base font-semibold">
                    Additional Charges (comma-separated)
                  </Label>
                  <Textarea
                    id="additionalCharges"
                    value={formData.additionalCharges}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalCharges: e.target.value })
                    }
                    placeholder="e.g., Toll fees extra, Inter-State Permit charges extra, Waiting charges ₹100 per hour"
                    rows={3}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Vehicle Image */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  Vehicle Image
                </h3>
                
                <div>
                  <Label className="text-base font-semibold">
                    Vehicle Image <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2 space-y-4">
                    <Button
                      type="button"
                      onClick={handleImageUpload}
                      variant="outline"
                      className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-blue-400"
                    >
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Click to upload vehicle image
                        </p>
                      </div>
                    </Button>
                    {formData.image && (
                      <div className="relative">
                        <img
                          src={formData.image}
                          alt="Vehicle image"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, image: "" });
                            setSelectedFiles({ mainImage: null });
                          }}
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {isFormSubmitted && !formData.image && (
                    <p className="text-sm text-red-500 mt-1">
                      Vehicle image is required
                    </p>
                  )}
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  Settings
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="status" className="text-base font-semibold">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 mt-8">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      disabled={!formData.featured && maxFeaturedReached}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="featured" className="text-base font-semibold">
                      Featured Service
                    </Label>
                    {!formData.featured && maxFeaturedReached && (
                      <p className="text-xs text-gray-500">
                        (Max 3 featured services)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  SEO Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="seoTitle" className="text-base font-semibold">
                      SEO Title <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="seoTitle"
                      value={formData.seoTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, seoTitle: e.target.value })
                      }
                      placeholder="e.g., Toyota Etios Sedan - Comfortable Travel | Vinushree Tours"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoDescription" className="text-base font-semibold">
                      SEO Description <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Textarea
                      id="seoDescription"
                      value={formData.seoDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, seoDescription: e.target.value })
                      }
                      placeholder="Brief description for search engines (150-160 characters)"
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoKeywords" className="text-base font-semibold">
                      SEO Keywords <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="seoKeywords"
                      value={formData.seoKeywords}
                      onChange={(e) =>
                        setFormData({ ...formData, seoKeywords: e.target.value })
                      }
                      placeholder="e.g., sedan taxi, comfortable travel, airport transfer"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-admin-gradient text-white border-0"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingId ? "Update Service" : "Save Service"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services List - Horizontal Cards with Image Left */}
      {Array.isArray(services) && services.length === 0 ? (
        <div className="text-center py-12">
          <Car className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tariff Services Found</h3>
          <p className="text-gray-600 mb-6">
            Get started by adding your first tariff service to showcase your vehicle pricing.
          </p>
          <Button
            onClick={() => {
              scrollPositionRef.current = window.scrollY;
              setEditingId(null);
              setFormData({
                vehicleType: "",
                vehicleName: "",
                description: "",
                oneWayRate: "",
                roundTripRate: "",
                driverAllowance: "",
                minimumKmOneWay: "",
                minimumKmRoundTrip: "",
                image: "",
                status: "active",
                featured: false,
                additionalCharges: "",
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
              });
              setSelectedFiles({
                mainImage: null,
              });
              setIsAddModalOpen(true);
            }}
            className="bg-admin-gradient text-white border-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Service
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {Array.isArray(services) && services.map((service) => (
            <Card key={service._id} className="shadow-xl border-0">
              <CardContent className="p-10">
                <div className="flex gap-8">
                  {/* Left Side - Vehicle Image */}
                  <div className="flex-shrink-0">
                    <div className="w-96 h-72 rounded-lg overflow-hidden border">
                      <img
                        src={service.image || "/images/placeholder-vehicle.jpg"}
                        alt={service.vehicleName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Side - Service Content */}
                  <div className="flex-1 flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-semibold text-gray-900">{service.vehicleName}</h3>
                        <Badge
                          variant={service.status === "active" ? "default" : "secondary"}
                          className={service.status === "active" ? "bg-admin-gradient text-white" : ""}
                        >
                          {service.status}
                        </Badge>
                        {service.featured && (
                          <Badge className="bg-yellow-500 text-yellow-900">
                            ⭐ Featured
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        <Car className="h-4 w-4 inline mr-2" />
                        {service.vehicleType}
                      </p>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="font-semibold text-gray-900">One Way Rate: </span>
                          <span className="text-blue-600 font-semibold">₹{service.oneWayRate.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim()}/km</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Round Trip Rate: </span>
                          <span className="text-green-600 font-semibold">₹{service.roundTripRate.replace(/[₹$]/g, '').replace(/per\s*km/gi, '').replace(/\/km/gi, '').trim()}/km</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Driver Allowance: </span>
                          <span className="text-gray-600">₹{service.driverAllowance.replace(/[₹$]/g, '').trim()}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Min KM (One Way): </span>
                          <span className="text-gray-600">{service.minimumKmOneWay.replace(/km/gi, '').trim()} km</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="font-semibold text-gray-900">Min KM (Round Trip): </span>
                          <span className="text-gray-600">{service.minimumKmRoundTrip.replace(/km/gi, '').trim()} km</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Additional Charges: </span>
                          <span className="text-gray-600">{service.additionalCharges?.length || 0} items</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 ml-6">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(service)}
                        className="flex items-center gap-2 min-w-[120px]"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Service
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteClick(service._id!)}
                        className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 min-w-[120px]"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>{renderPaginationItems()}</PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Delete Service Confirmation Dialog */}
      <AlertDialog
        open={!!deletingServiceId}
        onOpenChange={() => setDeletingServiceId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              tariff service and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingServiceId && handleDelete(deletingServiceId)}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting && deletingButtonId === deletingServiceId ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Service"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Vehicle Type Confirmation Dialog */}
      <AlertDialog
        open={!!deletingVehicleTypeId}
        onOpenChange={() => setDeletingVehicleTypeId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vehicle Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this vehicle type? This action cannot be undone.
              All services using this vehicle type will need to be updated.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingVehicleTypeId && handleDeleteVehicleType(deletingVehicleTypeId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Vehicle Type
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}