import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { dbConnect } from "@/lib/mongoose";
import { getAuthUser } from "@/lib/auth";
import { use } from "react";

/* ================= ADD PRODUCT ================= */
export async function POST(req) {
  const user = await getAuthUser();

  try {
    await dbConnect();
    const body = await req.json();
    // console.log("user info from add product api", user?.adminName, body);

    if (!user.adminName) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const addedBy = {
      adminName: user.adminName,
      employeeId: user.employeeId,
      userRole: user.userRole,
      adminId:user.id
    };

    const {
      category,
      subCategory,
      serialNumber,
      brand,
      model,
      purchaseDate,
      warranty,
      remarks,
      status,

      // inUse
      userName,
      employeeId,
      designation,
      location,
      unit,
      phone,
      mail,

      // inRepair
      serviceCenter,
      serviceCenterLocation,
      serviceCenterPhone,
      serviceCenterEmail,
      carrierName,
    } = body;

    //  ONLY REQUIRED FIELDS
    if (!category || !serialNumber) {
      return NextResponse.json(
        { message: "Category and Serial Number are required" },
        { status: 400 },
      );
    }

    //  DUPLICATE SERIAL CHECK
    // const exists = await Product.findOne({ serialNumber });
    // if (exists) {
    //   return NextResponse.json(
    //     { message: "Serial number already exists" },
    //     { status: 409 },
    //   );
    // }


    
    // DUPLICATE SERIAL CHECK
if (serialNumber !== "N/A") {
  const exists = await Product.findOne({ serialNumber });

  if (exists) {
    return NextResponse.json(
      { message: "Serial number already exists" },
      { status: 409 }
    );
  }
}

    //  BASE PAYLOAD
    const payload = {
      category,
      subCategory,
      serialNumber,
      brand,
      model,
      purchaseDate,
      warranty,
      remarks,
      status, // default = inStock
      addedBy,
    };

    //  OPTIONAL inUse DATA
    if (status === "inUse") {
      payload.assignedUser = {
        userName,
        employeeId,
        designation,
        location,
        unit,
        phone,
        email: mail,
      };
    }

    //  OPTIONAL inRepair DATA
    if (status === "inRepair") {
      payload.repairInfo = {
        serviceCenter,
        location: serviceCenterLocation,
        phone: serviceCenterPhone,
        email: serviceCenterEmail,
        carrierName,
      };
    }

    const product = await Product.create(payload);

    return NextResponse.json(
      {
        message: "Product added successfully",
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}






/* ================= GET PRODUCTS ================= */
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const query = {};

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { serialNumber: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      data,
      pagination: {
        page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
