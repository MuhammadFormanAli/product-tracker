import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (!product.assignedUser) {
      return NextResponse.json(
        { message: "No assigned user" },
        { status: 400 }
      );
    }

    // Push to previousUsers ONLY when withdrawing
    product.previousUsers.push({
      user: product.assignedUser,
      assignedAt: product.updatedAt, // when it was last updated (assigned time)
      withdrawnAt: new Date(),
    });

    product.assignedUser = null;
    product.status = "inStock";

    await product.save();

    return NextResponse.json({
      message: "User withdrawn successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}