import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Tariff from "@/config/utils/admin/tariff/tariffSchema";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "@/config/utils/cloudinary"; // Add this import

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// GET - Fetch all tariff services with pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const vehicleType = searchParams.get("vehicleType");

    // Build query
    const query: any = { isDeleted: false };
    
    // Filter by vehicle type if provided
    if (vehicleType && vehicleType !== "all") {
      query.vehicleType = new RegExp(vehicleType, 'i');
    }

    const skip = (page - 1) * limit;

    // Get tariffs and total count
    const [tariffs, totalTariffs] = await Promise.all([
      Tariff.find(query)
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-isDeleted -__v')
        .lean(),
      Tariff.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalTariffs / limit);

    return NextResponse.json({
      success: true,
      data: tariffs,
      pagination: {
        currentPage: page,
        totalPages,
        totalTariffs,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      message: "Tariffs fetched successfully"
    });

  } catch (error) {
    console.error("Error fetching tariffs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tariffs",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST - Create new tariff service (Admin only)
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
    
    // Extract form fields
    const vehicleType = formData.get("vehicleType") as string;
    const vehicleName = formData.get("vehicleName") as string;
    const description = formData.get("description") as string;
    const oneWayRate = formData.get("oneWayRate") as string;
    const roundTripRate = formData.get("roundTripRate") as string;
    const driverAllowance = formData.get("driverAllowance") as string;
    const minimumKmOneWay = formData.get("minimumKmOneWay") as string;
    const minimumKmRoundTrip = formData.get("minimumKmRoundTrip") as string;
    const status = formData.get("status") as string;
    const featured = formData.get("featured") === "true";
    const seoTitle = formData.get("seoTitle") as string;
    const seoDescription = formData.get("seoDescription") as string;
    const seoKeywords = formData.get("seoKeywords") as string;

    // Parse arrays
    const additionalCharges = JSON.parse(formData.get("additionalCharges") as string || "[]");

    // Handle image upload
    const imageFile = formData.get("mainImage") as File;
    let imagePath = "";

    if (imageFile) {
      try {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const folderPath = `tariff`;
        const result = await uploadToCloudinary(buffer, folderPath);
        imagePath = result.secure_url;
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to upload image",
          },
          { status: 500 }
        );
      }
    }

    // Validate required fields (only minimal required fields)
    if (!vehicleType || !vehicleName || !imagePath) {
      return NextResponse.json(
        { success: false, message: "Vehicle type, vehicle name, and image are required" },
        { status: 400 }
      );
    }

    // Create new tariff
    const newTariff = new Tariff({
      vehicleType,
      vehicleName,
      description,
      oneWayRate,
      roundTripRate,
      driverAllowance,
      minimumKmOneWay,
      minimumKmRoundTrip,
      image: imagePath,
      status,
      featured,
      additionalCharges,
      seoTitle,
      seoDescription,
      seoKeywords,
    });

    await newTariff.save();

    return NextResponse.json({
      success: true,
      message: "Tariff service created successfully",
      data: newTariff
    });

  } catch (error: any) {
    console.error("Error creating tariff:", error);
    
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create tariff service" },
      { status: 500 }
    );
  }
}