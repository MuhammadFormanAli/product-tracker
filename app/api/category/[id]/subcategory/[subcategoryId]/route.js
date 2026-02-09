import { dbConnect } from "@/lib/mongoose";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

/* ================= DELETE SUBCATEGORY ================= */
export async function DELETE(req, { params }) {

  const { id, subcategoryId } = params;
  console.log(subcategoryId)

  try {

    await dbConnect();

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $pull: {
          subCategories: { _id: subcategoryId },
        },
      },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Subcategory deleted successfully",
        category: updatedCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE SUBCATEGORY ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
