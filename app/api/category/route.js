

import { dbConnect } from "@/lib/mongoose";
import Category from "@/models/Category";

import { NextResponse } from "next/server";

export async function GET(req) {

    try {
       await dbConnect();
const category = await Category.find().sort({ createdAt: -1 }).lean();
return NextResponse.json(category) 
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.status(500).json({ error: 'Internal server error' });
    }

}


export async function POST(request) {
try {
await dbConnect();
const body = await request.json();
// Basic validation
if (!body.name || !body.value) {
return new Response(JSON.stringify({ error: 'all fields are required' }), { status: 400 });
}


const created = await Category.create(body);
return new Response(JSON.stringify(created), { status: 201 });
} catch (err) {
console.error(err);
return new Response(JSON.stringify({ error: err.message }), { status: 500 });
}
}


