"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function Repair() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({});

  const submit = async () => {
    await axios.post(`/api/products/${id}/repair`, form);
    router.push(`/products/${id}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow">
      <h2 className="font-bold mb-4">Send to Repair</h2>

      {["serviceCenter","location","phone","email","carrierName"].map(f=>(
        <input
          key={f}
          placeholder={f}
          className="border p-2 w-full mb-2"
          onChange={(e)=>setForm({...form,[f]:e.target.value})}
        />
      ))}

      <button onClick={submit} className="bg-black text-white px-4 py-2">
        Submit
      </button>
    </div>
  );
}
