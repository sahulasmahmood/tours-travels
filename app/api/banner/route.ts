import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Banner from "@/config/utils/admin/banner/bannerSchema";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get("pageName");

    // Get only active banners for the specific page
    const query = { 
      status: "active", 
      isDeleted: false 
    };

    if (pageName) {
      query.pageName = pageName;
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
