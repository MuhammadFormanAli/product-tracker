

import { dbConnect } from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";

import { NextResponse } from "next/server";

export async function GET(req) {

    try {
       await dbConnect();
const adminUser = await AdminUser.find().sort({ createdAt: -1 }).lean();
return NextResponse.json(adminUser) 
    } catch (error) {
        console.error('Error fetching Admin Users:', error);
        return NextResponse.status(500).json({ error: 'Internal server error' });
    }

}




export async function POST(request) {
try {
await dbConnect();
const body = await request.json();
console.log(body)


// Basic validation
if (!body.adminName || !body.employeeId || !body.password) {
return new Response(JSON.stringify({ error: 'all fields are required' }), { status: 400 });
}


const created = await AdminUser.create(body);
console.log('console after create',created)
return new Response(JSON.stringify(created), { status: 201 });
} catch (err) {
console.error(err);
return new Response(JSON.stringify({ error: err.message }), { status: 500 });
}
}


