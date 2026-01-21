import ActivityLog from "@/models/ActivityLog";

export async function logActivity({ productId, action, meta }) {
  await ActivityLog.create({
    productId,
    action,
    meta,
  });
}
