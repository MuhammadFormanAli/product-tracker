"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return null;

  const options = getOptions(product, router, setOpen);

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <div className="flex justify-between border-b pb-3 mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="border px-4 py-1 rounded"
          >
            Options
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-64 border bg-white shadow">
              <button
                onClick={() =>
                  setIndex((i) => (i - 1 + options.length) % options.length)
                }
                className="w-full py-1 text-center border-b"
              >
                ▲
              </button>

              {options.map((o, i) => (
                <button
                  key={o.label}
                  onClick={o.action}
                  className={`w-full px-4 py-2 text-left ${
                    i === index ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {o.label}
                </button>
              ))}

              <button
                onClick={() =>
                  setIndex((i) => (i + 1) % options.length)
                }
                className="w-full py-1 text-center border-t"
              >
                ▼
              </button>
            </div>
          )}
        </div>
      </div>

      <Info label="Serial" value={product.serialNumber} />
      <Info label="Category" value={product.category} />
      <Info label="Status" value={product.status} />

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push(`/products/${id}/print`)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Print Asset
        </button>

        <button
          onClick={() => router.push(`/products/${id}/history`)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Print History
        </button>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
}

function getOptions(product, router, close) {
  const go = (path) => () => {
    close(false);
    router.push(`/products/${product._id}/${path}`);
  };

  if (product.status === "inStock")
    return [
      { label: "Assign to User", action: go("assign") },
      { label: "Send to Repair", action: go("repair") },
      { label: "Mark Damaged", action: go("damage") },
    ];

  if (product.status === "inUse")
    return [
      { label: "Withdraw", action: go("withdraw") },
      { label: "Send to Repair", action: go("repair") },
    ];

  if (product.status === "inRepair")
    return [
      { label: "Return to Stock", action: go("return") },
      { label: "Send to Supplier", action: go("supplier") },
    ];

  return [];
}
