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
      console.log(res.data);
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

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-3 mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>

        {/* OPTIONS */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="border px-4 py-1 rounded hover:bg-gray-100"
          >
            Options
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-64 border bg-white shadow rounded">
              {options.map((o) => (
                <button
                  key={o.label}
                  onClick={o.action}
                  className="w-full text-left px-4 py-2 border-b last:border-b-0 hover:bg-gray-100"
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* INFO */}

      <Info label="Serial Number" value={product.serialNumber} />
      <Info label="Category" value={product.category} />
      <Info label="Status" value={product.status} />
      {product?.status === "inRepair" && (
        <div className="flex gap-2" >
          <p className="font-bold">Repair Type: </p>
          <p className="text-red-500">{product?.repairInfo[product?.repairInfo?.length - 1]?.repairType} </p>
        </div>
      )}

      {/* ACTIONS */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push(`/products/${id}/print`)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Print Asset
        </button>

        {/* <button
          onClick={() => router.push(`/products/${id}/history`)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Print History
        </button> */}
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Info({ label, value }) {
  return (
    <p className="mb-1">
      <strong>{label}:</strong> {value}
    </p>
  );
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
