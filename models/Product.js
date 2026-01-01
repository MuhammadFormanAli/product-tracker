import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
category: { type: String, required: true },
serialNumber: { type: String, required: true, },
brand: String,
model: String,
status: { type: String, default: 'inStock' },
purchaseDate: Date,
warranty: String,
remarks: String,
user:Array
}, { timestamps: true });


export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
