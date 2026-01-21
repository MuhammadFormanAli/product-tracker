import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { logActivity } from "@/lib/logActivity";
import { dbConnect } from "@/lib/mongoose";

export async function POST(req, { params }) {
  await dbConnect();
  const body = await req.json();

  await logActivity({
    productId: params.id,
    action: "SENT_TO_SUPPLIER",
    meta: body,
  });

  return NextResponse.json({ success: true });
}
