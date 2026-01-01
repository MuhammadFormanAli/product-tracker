
// import mongoose from 'mongoose';


// const MONGODB_URI = process.env.MONGODB_URI;


// if (!MONGODB_URI) {
// throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }


// /**
// * Use global cache for dev to avoid creating too many connections
// */
// let cached = global.mongoose;


// if (!cached) cached = global.mongoose = { conn: null, promise: null };


// async function dbConnect() {
// if (cached.conn) return cached.conn;


// if (!cached.promise) {
// const opts = {
// bufferCommands: false,
// // Add other recommended options as needed
// };


// cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
// return mongooseInstance;
// });
// }
// cached.conn = await cached.promise;
// return cached.conn;
// }


// export default dbConnect;


import mongoose from "mongoose";

export const dbConnect = async () => {
try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected To MongoDB');
} catch (error) {
    console.log('Error Connecting To MongoDB:', error)
}
}


