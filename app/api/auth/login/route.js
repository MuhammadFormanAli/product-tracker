

import { signToken } from "@/lib/jwt";
import { dbConnect } from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { employeeId, password } = await req.json();

  const admin = await AdminUser.findOne({ employeeId });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({
        id: admin._id,
        employeeId: admin.employeeId,
        userRole: admin.userRole,
        adminName:admin.adminName
      });

  const res = NextResponse.json({ message: "Logged in" });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
