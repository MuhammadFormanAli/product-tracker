import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { logActivity } from "@/lib/logActivity";
import { dbConnect } from "@/lib/mongoose";

export async function POST(req, { params }) {
  await dbConnect();
  const body = await req.json();

  const product = await Product.findById(params.id);
  if (product.status !== "inStock") {
    return NextResponse.json({ message: "Invalid state" }, { status: 400 });
  }

  product.status = "inUse";
  product.assignedUser = body;
  await product.save();

  await logActivity({
    productId: product._id,
    action: "ASSIGNED_TO_USER",
    meta: body,
  });

  return NextResponse.json({ success: true });
}
