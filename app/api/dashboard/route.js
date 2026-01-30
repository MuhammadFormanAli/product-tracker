import { dbConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


export async function GET() {
  await dbConnect();

  const products = await Product.find({}).lean();

  /* ---------------- KPIs ---------------- */
  const kpis = {
    total: products.length,
    inStock: products.filter(p => p.status === "inStock").length,
    inUse: products.filter(p => p.status === "inUse").length,
    inRepair: products.filter(p => p.status === "inRepair").length,
    damage: products.filter(p => p.status === "damage").length,
  };

  /* ---------------- CHARTS ---------------- */
  const byStatus = kpis;

  const byCategory = {};
  products.forEach(p => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });

  /* ---------------- SLA BREACH (example: >14 days) ---------------- */
  const slaBreaches = products
    .filter(p => p.status === "inRepair")
    .map(p => {
      const lastRepair = p.repairInfo?.[p.repairInfo.length - 1];
      if (!lastRepair?.sentDate) return null;

      const days =
        (Date.now() - new Date(lastRepair.sentDate)) /
        (1000 * 60 * 60 * 24);

      if (days > 14 && lastRepair.repairStatus === "PENDING") {
        return {
          serialNumber: p.serialNumber,
          repairType: lastRepair.repairType,
          days: Math.floor(days),
        };
      }
      return null;
    })
    .filter(Boolean);

  return NextResponse.json({
    kpis,
    charts: {
      byStatus,
      byCategory,
    },
    slaBreaches,
    products: products.map(p => ({
      _id: p._id,
      serialNumber: p.serialNumber,
      category: p.category,
      status: p.status,
      repairInfo: p.repairInfo,
    })),
  });
}
