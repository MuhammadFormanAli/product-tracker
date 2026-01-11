"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddProduct = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    defaultValues: {
      status: "inStock", // ✅ DEFAULT STATUS
    },
  });

  const status = watch("status");
  const isInUse = status === "inUse";
  const isInRepair = status === "inRepair";

  const onSubmit = async (data) => {
    console.log("FORM DATA:", data); // 🔍 CHECK: status should exist

    try {
      setLoading(true);
      await axios.post("/api/products", data);
      toast.success("Product added successfully");
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-100 p-6">
      <p className="text-2xl font-semibold p-[10px] bg-white mb-1 rounded border"> Add Product</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-6"
      >
        {/* BASIC INFO */}
        <div className="grid grid-cols-2 gap-4 border p-4 rounded">
          <div>
            <label>Category *</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="input"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label>Serial Number *</label>
            <input
              {...register("serialNumber", {
                required: "Serial number is required",
              })}
              className="input"
            />
            {errors.serialNumber && (
              <p className="text-red-500 text-sm">
                {errors.serialNumber.message}
              </p>
            )}
          </div>

          <input {...register("brand")} placeholder="Brand" className="input" />
          <input {...register("model")} placeholder="Model" className="input" />
          <input type="date" {...register("purchaseDate")} className="input" />
          <input {...register("warranty")} placeholder="Warranty" className="input" />
          <input
            {...register("remarks")}
            placeholder="Remarks"
            className="input col-span-2"
          />
        </div>

        {/* STATUS (OPTIONAL) */}
        <div className="flex gap-6">
          {["inStock", "inUse", "inRepair", "damage"].map((s) => (
            <label key={s} className="flex gap-2 items-center capitalize">
              <input type="radio" value={s} {...register("status")} />
              {s.replace(/([A-Z])/g, " $1")}
            </label>
          ))}
        </div>

        {/* IN USE */}
        {isInUse && (
          <div className="grid grid-cols-2 gap-4 border p-4 rounded">
            <input {...register("userName", { required: true })} placeholder="User Name" className="input" />
            <input {...register("employeeId", { required: true })} placeholder="Employee ID" className="input" />
            <input {...register("designation", { required: true })} placeholder="Designation" className="input" />
            <input {...register("location", { required: true })} placeholder="Location" className="input" />
            <input {...register("phone", { required: true })} placeholder="Phone" className="input" />
            <input type="email" {...register("mail")} placeholder="Email" className="input" />
          </div>
        )}

        {/* IN REPAIR */}
        {isInRepair && (
          <div className="grid grid-cols-2 gap-4 border p-4 rounded">
            <input {...register("serviceCenter", { required: true })} placeholder="Service Center" className="input" />
            <input {...register("serviceCenterLocation", { required: true })} placeholder="Location" className="input" />
            <input {...register("serviceCenterPhone", { required: true })} placeholder="Phone" className="input" />
            <input type="email" {...register("serviceCenterEmail", { required: true })} placeholder="Email" className="input" />
            <input {...register("carrierName", { required: true })} placeholder="Carrier Name" className="input col-span-2" />
          </div>
        )}

        <button
          disabled={loading}
          className="w-full bg-[#5C2E23] text-white py-2 rounded hover:bg-[#974d3b] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
};

export default AddProduct;
