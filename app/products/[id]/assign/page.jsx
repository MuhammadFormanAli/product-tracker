"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function Assign() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({});

  const submit = async () => {
    await axios.post(`/api/products/${id}/assign`, form);
    toast.success("Assigned successfully");
    router.push(`/products/${id}/details`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow">
      <h2 className="font-bold mb-4">Assign to User</h2>

      {["userName","employeeId","designation","location","phone","email"].map(f=>(
        <input
          key={f}
          placeholder={f}
          className="border p-2 w-full mb-2"
          onChange={(e)=>setForm({...form,[f]:e.target.value})}
        />
      ))}

      <button onClick={submit} className="bg-black text-white px-4 py-2">
        Assign
      </button>
    </div>
  );
}
