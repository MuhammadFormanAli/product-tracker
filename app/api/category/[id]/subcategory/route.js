import { NextResponse } from "next/server"
import Category from "@/models/Category"
import { dbConnect } from "@/lib/mongoose"

// ADD SUB CATEGORY
export async function POST(req, { params }) {
    const  {id } = await params
  try {
    await dbConnect()

    

    const body = await req.json()
    const { name } = body

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { message: "Sub-category name is required" },
        { status: 400 }
      )
    }

    // Find category
    const category = await Category.findById(id)
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      )
    }

    // Duplicate sub-category check
    const exists = category.subCategories.some(
      (sub) => sub.name.toLowerCase() === name.trim().toLowerCase()
    )

    if (exists) {
      return NextResponse.json(
        { message: "Sub-category already exists" },
        { status: 409 }
      )
    }

    // Add sub-category
    category.subCategories.push({
      name: name.trim(),
    })

    await category.save()

    return NextResponse.json(
      {
        message: "Sub-category added successfully",
        category,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("ADD SUB-CATEGORY ERROR:", error)

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}



