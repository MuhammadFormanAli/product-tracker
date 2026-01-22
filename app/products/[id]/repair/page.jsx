"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import RepairInfoForm from "@/app/components/RepairInfoForm";

export default function Repair() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({});

  const submit = async () => {
    await axios.post(`/api/products/${id}/repair`, form);
    router.push(`/products/${id}`);
  };

  return (


<>
  <RepairInfoForm />
</>
  );
}
