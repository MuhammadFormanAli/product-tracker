import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


export async function PUT(req, { params }) {

  
  try {
    await dbConnect();
    const body = await req.json();

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (product.status === "inRepair") {
      return NextResponse.json(
        { message: "Cannot assign while in repair" },
        { status: 400 }
      );
    }

    // Move existing user to history
    if (product.assignedUser) {
      product.previousUsers.push(product.assignedUser);
    }

    product.assignedUser = body;
    product.status = "inUse";

    await product.save();

    return NextResponse.json({
      message: "User assigned successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


