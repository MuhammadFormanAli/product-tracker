"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/app/loading";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        toast.error("Failed to load product");
        router.back();
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, router]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) return <Loading />;
  if (!product) return null;

  return (
    <div className="p-6 bg-white rounded shadow max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b pb-3 mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>

        {/* OPTIONS */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="border px-4 py-1 rounded hover:bg-gray-100"
          >
            Options ⌄
          </button>

          {open && (
            <Options
              product={product}
              router={router}
              close={() => setOpen(false)}
            />
          )}
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <Field label="Serial Number" value={product.serialNumber} />
        <Field label="Category" value={product.category} />
        <Field label="Brand" value={product.brand || "-"} />
        <Field label="Model" value={product.model || "-"} />
        <Field label="Status" value={product.status} />
        <Field label="Remarks" value={product.remarks || "-"} />

        {product.status === "inUse" && product.assignedUser && (
          <>
            <Field label="User Name" value={product.assignedUser.userName} />
            <Field label="Employee ID" value={product.assignedUser.employeeId} />
            <Field label="Designation" value={product.assignedUser.designation} />
            <Field label="Location" value={product.assignedUser.location} />
            <Field label="Phone" value={product.assignedUser.phone} />
            <Field label="Email" value={product.assignedUser.email} />
          </>
        )}

        {product.status === "inRepair" && product.repairInfo && (
          <>
            <Field label="Service Center" value={product.repairInfo.serviceCenter} />
            <Field label="Location" value={product.repairInfo.location} />
            <Field label="Phone" value={product.repairInfo.phone} />
            <Field label="Email" value={product.repairInfo.email} />
            <Field label="Carrier Name" value={product.repairInfo.carrierName} />
          </>
        )}
      </div>

      {/* PRINT */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push(`/products/${product._id}/print`)}
          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-black"
        >
          Print Asset
        </button>
      </div>
    </div>
  );
}

/* ================= OPTIONS ================= */

function Options({ product, router, close }) {
  const go = (path) => {
    close();
    router.push(`/products/${product._id}/${path}`);
  };

  return (
    <div className="absolute right-0 mt-2 bg-white border rounded shadow w-60 z-50 text-sm">
      {product.status === "inStock" && (
        <>
          <Option label="Assign to User" onClick={() => go("assign")} />
          <Option label="Send to Repair" onClick={() => go("repair")} />
          <Option label="Mark as Damaged" onClick={() => go("damage")} />
        </>
      )}

      {product.status === "inUse" && (
        <>
          <Option label="Withdraw from User" onClick={() => go("withdraw")} />
          <Option label="Send to Repair" onClick={() => go("repair")} />
        </>
      )}

      {product.status === "inRepair" && (
        <>
          <Option label="Return to Stock" onClick={() => go("return-stock")} />
          <Option label="Send to Service Center" onClick={() => go("service-center")} />
          <Option label="Send to Supplier" onClick={() => go("supplier")} />
        </>
      )}
    </div>
  );
}

function Option({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
    >
      {label}
    </button>
  );
}

/* ================= HELPERS ================= */

function Field({ label, value }) {
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
}
