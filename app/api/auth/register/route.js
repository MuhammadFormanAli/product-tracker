import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";
import { signToken } from "@/lib/jwt";



export async function POST(req) {
  await dbConnect();
  const { adminName, employeeId, password } = await req.json();

  const exists = await AdminUser.findOne({ employeeId });
  if (exists) {
    return NextResponse.json({ message: "Employee Id already exists" }, { status: 400 });
  }

  const admin = await AdminUser.create({
    adminName,
    employeeId,
    password: await bcrypt.hash(password, 10),
    userRole: "admin",
  });
// console.log(admin)

  const token = signToken({
    id: admin?._id,
    employeeId: admin?.employeeId,
    userRole: admin?.userRole,
  });

// console.log(token)
  const res = NextResponse.json({ message: "Registered" });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}

