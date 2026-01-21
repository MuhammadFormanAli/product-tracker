import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { logActivity } from "@/lib/logActivity";
import { dbConnect } from "@/lib/mongoose";

export async function POST(req, { params }) {
  await dbConnect();

  const product = await Product.findById(params.id);
  product.status = "inStock";
  product.assignedUser = undefined;
  await product.save();

  await logActivity({
    productId: product._id,
    action: "WITHDRAWN_FROM_USER",
  });

  return NextResponse.json({ success: true });
}
