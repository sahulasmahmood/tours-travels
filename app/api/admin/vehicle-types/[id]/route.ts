import { type NextRequest, NextResponse } from "next/server";
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

// PUT - Update vehicle type
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    const { id } = await params;

    // Validate required fields
    if (!body.name || body.name.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle type name is required and cannot be empty",
        },
        { status: 400 },
      );
    }

    // Check if vehicle type already exists (excluding current vehicle type)
    const existingVehicleType = await VehicleType.findOne({
      name: { $regex: new RegExp(`^${body.name.trim()}$`, "i") },
      _id: { $ne: id },
    });

    if (existingVehicleType) {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle type with this name already exists",
        },
        { status: 400 },
      );
    }

    const updatedVehicleType = await VehicleType.findByIdAndUpdate(
      id,
      { name: body.name.trim() },
      { new: true, runValidators: true },
    );

    if (!updatedVehicleType) {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle type not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedVehicleType,
      message: "Vehicle type updated successfully",
    });
  } catch (error: unknown) {
    console.error("Error updating vehicle type:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update vehicle type",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// DELETE - Delete vehicle type
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = verifyAuth(request);
    if (!authResult.isValid) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const deletedVehicleType = await VehicleType.findByIdAndDelete(id);

    if (!deletedVehicleType) {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle type not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: deletedVehicleType,
      message: "Vehicle type deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting vehicle type:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete vehicle type",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
