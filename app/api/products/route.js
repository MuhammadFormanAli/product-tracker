// export async function GET(req) {

//     try {
//        await dbConnect();
// const products = await Product.find().sort({ createdAt: -1 }).lean();
// return NextResponse.json(products)
//     } catch (error) {
//         console.error('Error fetching product:', error);
//         return NextResponse.status(500).json({ error: 'Internal server error' });
//     }

// }

// export async function POST(request) {
// try {
// await dbConnect();
// const body = await request.json();
// // Basic validation
// if (!body.serialNumber || !body.category) {
// return new Response(JSON.stringify({ error: 'serial number and category are required' }), { status: 400 });
// }

// console.log('console from backend',body)
// const created = await Product.create(body);
// return new Response(JSON.stringify({created:'success'}), { status: 201 });
// } catch (err) {
// console.error(err);
// return new Response(JSON.stringify({ error: err.message }), { status: 500 });
// }
// }

// ------------------------------------------------
// new code for product api

// app/api/products/route.js
// import { dbConnect } from "@/lib/mongoose";
// import Product from "@/models/Product";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     await dbConnect();

//     const { searchParams } = new URL(req.url);

//     const page = Number(searchParams.get("page")) || 1;
//     const limit = Number(searchParams.get("limit")) || 10;
//     const search = searchParams.get("search") || "";
//     const status = searchParams.get("status");

//     const skip = (page - 1) * limit;

//     const query = {
//       ...(search && {
//         $or: [
//           { serialNumber: { $regex: search, $options: "i" } },
//           { brand: { $regex: search, $options: "i" } },
//           { model: { $regex: search, $options: "i" } },
//         ],
//       }),
//       ...(status && { status }),
//     };

//     const [products, total] = await Promise.all([
//       Product.find(query)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean(),
//       Product.countDocuments(query),
//     ]);

//     return NextResponse.json({
//       data: products,
//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     console.error("PRODUCT FETCH ERROR:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import Product from "@/models/Product";

import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { dbConnect } from "@/lib/mongoose";

/* ================= ADD PRODUCT ================= */

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    // console.log("Incoming Product:", body);

    if (!body.category || !body.serialNumber) {
      return NextResponse.json(
        { message: "Category and Serial Number are required" },
        { status: 400 }
      );
    }

    const product = await Product.create(body);

    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        message:
          error.code === 11000
            ? "Serial number already exists"
            : "Failed to create product",
      },
      { status: 500 }
    );
  }
}

/* ================= GET PRODUCTS ================= */
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const query = {};

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { serialNumber: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },        { category: { $regex: search, $options: "i" } },
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
      { status: 500 }
    );
  }
}
