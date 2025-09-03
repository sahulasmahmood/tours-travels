import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Banner from "@/config/utils/admin/banner/bannerSchema";
import jwt from "jsonwebtoken";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// GET - Fetch all banners
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get("pageName");

    // Build query for active banners only
    let query: any = { 
      status: "active", 
      isDeleted: false 
    };

    // Filter by page name if provided
    if (pageName) {
      query.pageName = pageName;
    }

    // For admin requests, check authorization
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      try {
        jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        // Admin can see all banners
        query = { isDeleted: false };
      } catch (error) {
        // Not admin, continue with public query
      }
    }

    const banners = await Banner.find(query)
      .sort({ createdAt: -1 })
      .select('-isDeleted -__v');

    return NextResponse.json({
      success: true,
      data: banners
    });

  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

// POST - Create new banner (Admin only)
export async function POST(request: NextRequest) {
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

    const formData = await request.formData();
    const pageName = formData.get("pageName") as string;
    const status = formData.get("status") as string;
    const file = formData.get("file") as File;

    if (!pageName || !file) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Process image upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public/uploads/banners");
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const filename = `banner-${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    const imagePath = `/uploads/banners/${filename}`;

    // Create banner
    const banner = await Banner.create({
      pageName,
      image: imagePath,
      status: status || "active"
    });

    return NextResponse.json({
      success: true,
      message: "Banner created successfully",
      data: banner
    });

  } catch (error: any) {
    console.error("Error creating banner:", error);
    
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create banner" },
      { status: 500 }
    );
  }
}
