import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Banner from "@/config/utils/admin/banner/bannerSchema";
import jwt from "jsonwebtoken";
import { writeFile, unlink, mkdir } from "fs/promises";
import { uploadToCloudinary } from "@/config/utils/cloudinary";
import path from "path";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// GET - Fetch single banner
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const banner = await Banner.findOne({ 
      _id: id, 
      isDeleted: false 
    }).select('-isDeleted -__v');

    if (!banner) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: banner
    });

  } catch (error) {
    console.error("Error fetching banner:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch banner" },
      { status: 500 }
    );
  }
}

// PUT - Update banner (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authorization header required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    try {
      jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const formData = await request.formData();
    const pageName = formData.get("pageName") as string;
    const status = formData.get("status") as string;
    const file = formData.get("file") as File | null;

    if (!pageName) {
      return NextResponse.json(
        { success: false, message: "Page name is required" },
        { status: 400 }
      );
    }

    let imagePath = undefined;

    if (file) {
      // Upload to Cloudinary
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      try {
        const result = await uploadToCloudinary(buffer, "banners");
        imagePath = result.secure_url;
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        return NextResponse.json({ success: false, message: "Failed to upload image to Cloudinary" }, { status: 500 });
      }
    }

    // Update banner
    const updateData: any = {
      pageName,
      status
    };
    if (imagePath) {
      updateData.image = imagePath;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBanner) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Banner updated successfully",
      data: updatedBanner
    });

  } catch (error: any) {
    console.error("Error updating banner:", error);
    
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to update banner" },
      { status: 500 }
    );
  }
}

// DELETE - Delete banner (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authorization header required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    try {
      jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Delete image file first
    const banner = await Banner.findById(id);
    if (banner && banner.image) {
      const imagePath = path.join(process.cwd(), "public", banner.image);
      try {
        await unlink(imagePath);
      } catch (error) {
        console.error("Error deleting image file:", error);
      }
    }

    // Delete banner from database
    await Banner.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Banner deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting banner:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
