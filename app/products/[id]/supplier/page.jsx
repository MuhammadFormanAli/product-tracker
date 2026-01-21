"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function SupplierPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    supplierName: "",
    warrantyType: "",
    referenceNo: "",
    expectedReturnDate: "",
    remarks: "",
  });

  const submit = async () => {
    try {
      await axios.post(`/api/products/${id}/supplier`, form);
      toast.success("Sent to supplier under warranty");
      router.push(`/products/${id}/details`);
    } catch (err) {
      toast.error("Failed to send to supplier");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Send to Supplier (Warranty)</h1>

      <Input label="Supplier Name" value={form.supplierName}
        onChange={(v) => setForm({ ...form, supplierName: v })}
      />

      <Input label="Warranty Type" value={form.warrantyType}
        onChange={(v) => setForm({ ...form, warrantyType: v })}
      />

      <Input label="Reference Number" value={form.referenceNo}
        onChange={(v) => setForm({ ...form, referenceNo: v })}
      />

      <Input
        label="Expected Return Date"
        type="date"
        value={form.expectedReturnDate}
        onChange={(v) => setForm({ ...form, expectedReturnDate: v })}
      />

      <Textarea
        label="Remarks"
        value={form.remarks}
        onChange={(v) => setForm({ ...form, remarks: v })}
      />

      <button
        onClick={submit}
        className="w-full bg-black text-white py-2 rounded mt-4 hover:bg-gray-800"
      >
        Submit
      </button>
    </div>
  );
}

/* ---------- INPUT COMPONENTS ---------- */

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        rows={3}
      />
    </div>
  );
}
