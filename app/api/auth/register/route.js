import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { adminName, employeeId, password } = body;

    // 1️ Validate input
    if (!adminName || !employeeId || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 2️ Check if employee already exists
    const exists = await AdminUser.findOne({ employeeId });
    if (exists) {
      return NextResponse.json(
        { message: "Employee ID already exists" },
        { status: 409 }
      );
    }

    // 3️ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️ Create admin user
    const admin = await AdminUser.create({
      adminName,
      employeeId,
      password: hashedPassword,
      userRole: "admin",
    });



    // 4 Send response with cookie
    const res = NextResponse.json(
      { message: "Admin registered successfully" },
      { status: 201 }
    );
    return res;

  } catch (error) {
    console.error("Admin Registration Error:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
