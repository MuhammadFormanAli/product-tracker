import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/mongoose";
import Brand from "@/models/Brand";

//  GET ALL brands
export async function GET() {
  try {
    await dbConnect();

    const brands = await Brand.find().sort({ name: 1 });

    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    console.error("GET BRAND ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch brands" },
      { status: 500 },
    );
  }
}

// ADD BRAND
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name } = body;

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );
    }

    // Duplicate check
    const exists = await Brand.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Brand already exists" },
        { status: 409 },
      );
    }

    const brand = await Brand.create({
      name: name.trim(),
    });

    return NextResponse.json(
      {
        message: "Brand added successfully",
        brand,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Add Brand Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
