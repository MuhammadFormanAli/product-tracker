import { NextResponse } from "next/server";

import Product from "@/models/Product";
import { logActivity } from "@/lib/logActivity";
import { dbConnect } from "@/lib/mongoose";

export async function POST(req, { params }) {
  await dbConnect();
  const body = await req.json();

  const product = await Product.findById(params.id);
  product.status = "inRepair";
  product.repairInfo = body;
  await product.save();

  await logActivity({
    productId: product._id,
    action: "SENT_TO_IT_REPAIR",
    meta: body,
  });

  return NextResponse.json({ success: true });
}
