import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function PATCH(req, { params }) {
  const { id } = await params;
  await dbConnect();
  const {  remarks, deliveryDate, receivedDate, returnTo } = await req.json();
  
  

  const product = await Product.findById(id);
  const repairIndex = product?.repairInfo?.length - 1
  console.log(repairIndex)
  if (!product ) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  const repair = product.repairInfo[repairIndex];
  if (!repair || repair.repairType !== "SERVICE_CENTER") {
    return Response.json({ message: "Invalid repair" }, { status: 400 });
  }

  repair.repairStatus = "SUCCESS";
  repair.remarks = remarks;
  repair.deliveryDate = deliveryDate;
  repair.receivedDate = receivedDate;

  product.status = returnTo === "USER" ? "inUse" : "inStock";

  await product.save();

  return Response.json({ message: " Repair Success" });
}
