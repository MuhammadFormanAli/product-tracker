
import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {

    try {
       await dbConnect();
const products = await Product.find().sort({ createdAt: -1 }).lean();
return NextResponse.json(products) 
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.status(500).json({ error: 'Internal server error' });
    }

}


export async function POST(request) {
try {
await dbConnect();
const body = await request.json();
// Basic validation
if (!body.serialNumber || !body.category) {
return new Response(JSON.stringify({ error: 'serial number and category are required' }), { status: 400 });
}

console.log('console from backend',body)
const created = await Product.create(body);
return new Response(JSON.stringify({created:'success'}), { status: 201 });
} catch (err) {
console.error(err);
return new Response(JSON.stringify({ error: err.message }), { status: 500 });
}
}



