import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
import ActivityLog from "@/models/ActivityLog";
import { dbConnect } from "@/lib/mongoose";

export async function GET(req, { params }) {
  await dbConnect();

  const logs = await ActivityLog.find({ productId: params.id }).sort({
    createdAt: -1,
  });

  return NextResponse.json(logs);
}
