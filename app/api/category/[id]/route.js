import { NextResponse } from "next/server";
import Category from "@/models/Category";
import { dbConnect } from "@/lib/mongoose";

//  GET SINGLE CATEGORY
export async function GET(req, { params }) {
const {id }= await  params
  try {
    await dbConnect();
    
    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//  UPDATE CATEGORY
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name } = body;

    if (!name ) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

// Duplicate check
    const exists = await Category.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 409 },
      );
    }


    const updated = await Category.findByIdAndUpdate(
      params.id,
      { name },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category updated", category: updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//  DELETE CATEGORY
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const deleted = await Category.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
