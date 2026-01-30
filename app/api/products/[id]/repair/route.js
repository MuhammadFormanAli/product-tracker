import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await req.json();
console.log(body)
    const product = await Product.findById(id);
    console.log(product)
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    /**
     * Build repair object
     */
    const repairEntry = {
      repairType: body.repairType,
      serviceCenter: body.serviceCenter,
      location: body.location,
      phone: body.phone,
      email: body.email,

      carrierName: body.carrierName,
      carrierPhoneNumber: body.contactNumber,

      issueDescription: body.issueDescription,

      sentDate: body.sentDate || null,
      receivedDate: body.receivedDate || null,
      deliveryDate: null,

      repairStatus: "PENDING",
      repairCost: body.repairCost || 0,
      remarks: body.remarks || "",
    };

    /**
     * Push repair info
     */
    product.repairInfo.push(repairEntry);

    /**
     * Update status
     */
    product.status = "inRepair";

    await product.save();

    return NextResponse.json(
      { message: "Repair initiated successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Repair Error:", error);
    return NextResponse.json(
      { message: "Failed to create repair entry" },
      { status: 500 }
    );
  }
}
