"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function ServiceCenterPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    serviceCenter: "",
    location: "",
    phone: "",
    email: "",
    carrierName: "",
  });

  const submit = async () => {
    try {
      await axios.post(`/api/products/${id}/service-center`, form);
      toast.success("Sent to service center");
      router.push(`/products/${id}`);
    } catch (err) {
      toast.error("Failed to send to service center");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Send to Service Center</h1>

      <Input label="Service Center Name" value={form.serviceCenter}
        onChange={(v) => setForm({ ...form, serviceCenter: v })}
      />

      <Input label="Location" value={form.location}
        onChange={(v) => setForm({ ...form, location: v })}
      />

      <Input label="Phone" value={form.phone}
        onChange={(v) => setForm({ ...form, phone: v })}
      />

      <Input label="Email" value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
      />

      <Input label="Carrier Name" value={form.carrierName}
        onChange={(v) => setForm({ ...form, carrierName: v })}
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

/* ---------- INPUT COMPONENT ---------- */
function Input({ label, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
      />
    </div>
  );
}
