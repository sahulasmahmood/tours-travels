import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import VehicleType from "@/config/utils/admin/vehicleType/VehicleTypeSchema";
import jwt from "jsonwebtoken";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// Verify admin authentication
function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { isValid: false, message: "Unauthorized - No token provided" };
  }

  const token = authHeader.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

  try {
    jwt.verify(token, JWT_SECRET) as DecodedToken;
    return { isValid: true };
  } catch (error) {
    return { isValid: false, message: "Unauthorized - Invalid token" };
  }
}

// GET - Fetch all vehicle types
export async function GET(request: NextRequest) {
  try {
    const authResult = verifyAuth(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    await connectDB();
    
    // Check if vehicle types exist, if not create default data (only once)
    let vehicleTypes = await VehicleType.find({}).sort({ name: 1 });
    
    if (vehicleTypes.length === 0) {
      // Create default vehicle types if none exist - using insertMany with ordered: false to skip duplicates
      const defaultVehicleTypes = [
        { name: "Sedan" },
        { name: "SUV" },
        { name: "Premium" },
        { name: "Luxury" },
        { name: "Tempo" },
      ];

      try {
        await VehicleType.insertMany(defaultVehicleTypes, { ordered: false });
        vehicleTypes = await VehicleType.find({}).sort({ name: 1 });
        console.log("✅ Vehicle types initialized with default values");
      } catch (insertError: any) {
        // If error is due to duplicates (E11000), that's fine - just fetch existing data
        if (insertError.code === 11000) {
          vehicleTypes = await VehicleType.find({}).sort({ name: 1 });
          console.log("✅ Vehicle types already exist, using existing data");
        } else {
          throw insertError;
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      data: vehicleTypes,
      message: "Vehicle types fetched successfully",
    });
  } catch (error: unknown) {
    console.error("Error fetching vehicle types:", error); 
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch vehicle types",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST - Create new vehicle type
export async function POST(request: NextRequest) {
  try {
    const authResult = verifyAuth(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || body.name.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle type name is required and cannot be empty",
        },
        { status: 400 }
      );
    }
    
    // Check if vehicle type already exists
    const existingVehicleType = await VehicleType.findOne({ 
      name: { $regex: new RegExp(`^${body.name.trim()}$`, 'i') } 
    });
    
    if (existingVehicleType) {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle type with this name already exists",
        },
        { status: 400 }
      );
    }
    
    const vehicleTypeData = {
      name: body.name.trim(),
    };
    
    const newVehicleType = new VehicleType(vehicleTypeData);
    const savedVehicleType = await newVehicleType.save();
    
    return NextResponse.json({
      success: true,
      data: savedVehicleType,
      message: "Vehicle type created successfully",
    });
  } catch (error: unknown) {
    console.error("Error creating vehicle type:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create vehicle type",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
