"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
      console.log('products details',res.data)
    });
  }, [id]);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!product) return null;

  const options = getOptions(product, router, setOpen);

  const lastRepair =
    Array.isArray(product.repairInfo) && product.repairInfo.length
      ? product.repairInfo[product.repairInfo.length - 1]
      : null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{product.serialNumber}</h1>
          <p className="text-sm text-gray-500">
            {product.brand} • {product.model}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <StatusBadge status={product.status} />

          {/* OPTIONS */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="border px-4 py-1.5 rounded hover:bg-gray-100 text-sm"
            >
              Options
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-64 border bg-white shadow rounded z-10">
                {options.length === 0 && (
                  <p className="px-4 py-2 text-sm text-gray-500">
                    No actions available
                  </p>
                )}

                {options.map((o) => (
                  <button
                    key={o.label}
                    onClick={o.action}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b last:border-b-0"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Asset Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-4">📦 Asset Information</h2>

          <Info label="Category" value={product.category} />
          <Info label="Purchase Date" value={formatDate(product.purchaseDate)} />
          <Info label="Warranty (months)" value={product.warranty} />
          <Info label="Remarks" value={product.remarks} />
        </div>

        {/* Assigned User */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-4">👤 Assigned User</h2>

          {product.assignedUser ? (
            <>
              <Info label="Name" value={product.assignedUser.userName} />
              <Info label="Employee ID" value={product.assignedUser.employeeId} />
              <Info label="Designation" value={product.assignedUser.designation} />
              <Info label="Location" value={product.assignedUser.location} />
              <Info label="Phone" value={product.assignedUser.phone} />
              <Info label="Email" value={product.assignedUser.email} />
            </>
          ) : (
            <p className="text-sm text-gray-500">Not assigned</p>
          )}
        </div>
      </div>

      {/* REPAIR SUMMARY */}
      {product.status === "inRepair" && lastRepair && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-4">🛠 Current Repair</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <Info label="Repair Type" value={lastRepair.repairType} />
            <Info label="Repair Status" value={lastRepair.repairStatus} />
            <Info label="Service Center" value={lastRepair.serviceCenter} />
            <Info label="Carrier" value={lastRepair.carrierName} />
            <Info label="Sent Date" value={formatDate(lastRepair.sentDate)} />
            <Info label="Delivery Date" value={formatDate(lastRepair.deliveryDate)} />
            <Info label="Repair Cost" value={lastRepair.repairCost} />
          </div>
        </div>
      )}

      {/* REPAIR TIMELINE */}
      {product.repairInfo?.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-4">🕒 Repair History</h2>

          <ol className="relative border-l border-gray-200 ml-4 space-y-6">
            {product.repairInfo.map((r, i) => (
              <li key={i} className="ml-6">
                <span
                  className={`absolute -left-3 w-6 h-6 rounded-full
                    ${
                      r.repairStatus === "SUCCESS"
                        ? "bg-green-500"
                        : r.repairStatus === "FAILED"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                />
                <p className="font-medium text-sm">
                  {r.repairType} – {r.repairStatus}
                </p>
                <p className="text-xs text-gray-500">
                  Sent: {formatDate(r.sentDate)} | Received:{" "}
                  {formatDate(r.receivedDate)}
                </p>
                <p className="text-sm text-gray-600">{r.issueDescription}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push(`/products/${id}/print`)}
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          Print Asset
        </button>
      </div>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

function Info({ label, value }) {
  return (
    <div className="mb-2 text-sm">
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    inStock: "bg-green-100 text-green-700",
    inUse: "bg-blue-100 text-blue-700",
    inRepair: "bg-yellow-100 text-yellow-700",
    damage: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${map[status]}`}>
      {status}
    </span>
  );
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString();
}



function getOptions(product, router, close) {
  const go = (path) => () => {
    close(false);
    router.push(`/products/${product._id}/${path}`);
  };

  const lastRepair =
    Array.isArray(product.repairInfo) && product.repairInfo.length > 0
      ? product.repairInfo[product.repairInfo.length - 1]
      : null;

  /* ---------------- IN STOCK ---------------- */
  if (product.status === "inStock") {
    return [
      { label: "Assign to User", action: go("assign") },
      { label: "Repair", action: go("repair") },
      { label: "Mark as Damaged", action: go("damage") },
    ];
  }

  /* ---------------- IN USE ---------------- */
  if (product.status === "inUse") {
    return [
      { label: "Withdraw from User", action: go("withdraw") },
      { label: "Repair", action: go("repair") },
    ];
  }

  /* ---------------- INTERNAL REPAIR ---------------- */
  if (
    product.status === "inRepair" &&
    lastRepair?.repairType === "INTERNAL"
  ) {
    return [
      { label: "Success", action: go("repair/internal/success") },
      { label: "Send to Service Center", action: go("repair/internal/fail") },
      { label: "Mark as Damaged", action: go("repair/internal/damage") },
    ];
  }

  /* ---------------- SERVICE CENTER REPAIR ---------------- */
  if (
    product.status === "inRepair" &&
    lastRepair?.repairType === "SERVICE_CENTER"
  ) {
    return [
      { label: "Success", action: go("repair/service-center/success") },
      { label: "Mark as Damaged", action: go("repair/service-center/fail") },
    ];
  }

  /* ---------------- DAMAGED ---------------- */
  if (product.status === "damage") {
    return [];
  }

  return [];
}
