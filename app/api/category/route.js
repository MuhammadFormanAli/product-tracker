import { NextResponse } from "next/server";
import Category from "@/models/Category";
import { dbConnect } from "@/lib/mongoose";

//  GET ALL CATEGORIES
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find().sort({ name: 1 });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET CATEGORY ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// ADD CATEGORY
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, value } = body;

    //  Validation
    if (!name || !value) {
      return NextResponse.json(
        { message: "Name and Value are required" },
        { status: 400 }
      );
    }

    // Duplicate check
    const exists = await Category.findOne({
      $or: [{ name }, { value }],
    });

    if (exists) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 409 }
      );
    }

    const category = await Category.create({
      name,
      value,
    });

    return NextResponse.json(
      {
        message: "Category added successfully",
        category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ADD CATEGORY ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


