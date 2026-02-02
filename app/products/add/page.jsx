"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const   AddProduct = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

 
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    defaultValues: { status: "inStock" },
  });

  const selectedCategory = watch("category");
  const status = watch("status");
  const isInUse = status === "inUse";

  /* ---------- SUBCATEGORY HANDLER ---------- */
  useEffect(() => {
    const cat = categories.find((c) => c.name === selectedCategory);

    if (cat && cat.subCategories?.length > 0) {
      setSubCategories(cat.subCategories);
    } else {
      setSubCategories([]);
      setValue("subCategory", ""); // reset
    }
  }, [selectedCategory, categories, setValue]);

  /* ---------- SUBMIT ---------- */
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/products", data);
      toast.success("Product added successfully");
      router.push("/");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- FETCH CATEGORIES ---------- */
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then(setCategories);
  }, []);


  /* ---------- fetch brands ---------- */
  useEffect(() => {
    fetch("/api/brand")
      .then((res) => res.json())
      .then(setBrands);
  }, []);

  return (
    <div className="bg-gray-100 p-6">
      <p className="text-2xl font-semibold p-3 bg-white mb-2 rounded border">
        Add Product
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow space-y-6"
      >
        {/* BASIC INFO */}
        <div className="grid grid-cols-2 gap-4 border p-4 rounded">
          
          {/* CATEGORY */}
          <div>
            <label className="label">Category *</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="input"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="error">{errors.category.message}</p>
            )}
          </div>

          {/* SUBCATEGORY */}
          <div>
            <label className="label">Subcategory</label>
            <select
              {...register("subCategory")}
              disabled={subCategories.length === 0}
              className={`input ${
                subCategories.length === 0
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
            >
              <option value="">
                {subCategories.length === 0
                  ? "No subcategory available"
                  : "Select Subcategory"}
              </option>
              {subCategories.map((sc) => (
                <option key={sc._id} value={sc.name}>
                  {sc.name}
                </option>
              ))}
            </select>
          </div>

          {/* SERIAL */}
          <div>
            <label className="label">Serial Number *</label>
            <input
              {...register("serialNumber", {
                required: "Serial number is required",
              })}
              className="input"
            />
            {errors.serialNumber && (
              <p className="error">{errors.serialNumber.message}</p>
            )}
          </div>

          {/* BRAND */}
<div>
  <label className="label">Brand *</label>
  <select
    {...register("brand", { required: "Brand is required" })}
    className="input"
  >
    <option value="">Select Brand</option>
    {brands.map((b) => (
      <option key={b._id} value={b.name}>
        {b.name}
      </option>
    ))}
  </select>

  {errors.brand && (
    <p className="error">{errors.brand.message}</p>
  )}
</div>


          <div>
            <label className="label">Model</label>
            <input {...register("model")} className="input" />
          </div>

          <div>
            <label className="label">Purchase Date</label>
            <input type="date" {...register("purchaseDate")} className="input" />
          </div>

          <div>
            <label className="label">Warranty (Months)</label>
            <input type="number" {...register("warranty")} className="input" />
          </div>

          <div className="col-span-2">
            <label className="label">Remarks</label>
            <input {...register("remarks")} className="input" />
          </div>
        </div>

        {/* STATUS */}
        <div className="flex gap-6">
          {["inStock", "damage", "inUse"].map((s) => (
            <label key={s} className="flex gap-2 items-center capitalize">
              <input type="radio" value={s} {...register("status")} />
              {s}
            </label>
          ))}
        </div>

        {/* IN USE */}
        {isInUse && (
          <div className="grid grid-cols-2 gap-4 border p-4 rounded">
            {[
              ["userName", "User Name"],
              ["employeeId", "Employee ID"],
              ["designation", "Designation"],
              ["location", "Location"],
              ["phone", "Phone"],
              ["mail", "Email"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="label">{label}</label>
                <input
                  {...register(name)}
                  className="input"
                  type={name === "mail" ? "email" : "text"}
                />
              </div>
            ))}
          </div>
        )}

        <button
          disabled={loading}
          className="w-full bg-[#5C2E23] text-white py-2 rounded hover:bg-[#974d3b] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>

      {/* TAILWIND HELPERS */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
        }
        .label {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
          display: block;
        }
        .error {
          color: #ef4444;
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default AddProduct;
