
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";




export async function GET(req, { params }) {
  const { id } = await params; 
  try {
    await dbConnect();

    
    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// export async function PUT(req, { params }) {
//   try {
//     await dbConnect();
//     const { id } = params;
//     console.log(id)
//     const body = await req.json();
//     const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

//     if (!updatedProduct) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedProduct, { status: 200 });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req, { params }) {
//   try {
//     await dbConnect();
//     const { id } = params;
//     const deletedProduct = await Product.findByIdAndDelete(id);

//     if (!deletedProduct) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
