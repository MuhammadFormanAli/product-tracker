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
      status: "inStock",
    },
  });

  const status = watch("status");
  const isInUse = status === "inUse";

  // const isInRepair = status === "inRepair";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/products", data);
      toast.success("Product added successfully");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then(setCategories);
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
          <div>
            <label className="label">Category *</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="input"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.name} >
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="error">{errors.category.message}</p>
            )}
          </div>

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

          <div>
            <label className="label">Brand</label>
            <input {...register("brand")} className="input" />
          </div>

          <div>
            <label className="label">Model</label>
            <input {...register("model")} className="input" />
          </div>

          <div>
            <label className="label">Purchase Date</label>
            <input
              type="date"
              {...register("purchaseDate")}
              className="input"
            />
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
              {s.replace(/([A-Z])/g, " $1")}
            </label>
          ))}
        </div>

        {/* IN USE */}
        {isInUse && (
          <div className="grid grid-cols-2 gap-4 border p-4 rounded">
            <div>
              <label className="label">User Name </label>
              <input
                {...register("userName")}
                className="input"
              />
            </div>

            <div>
              <label className="label">Employee ID </label>
              <input
                {...register("employeeId")}
                className="input"
              />
            </div>

            <div>
              <label className="label">Designation </label>
              <input
                {...register("designation")}
                className="input"
              />
            </div>

            <div>
              <label className="label">Location </label>
              <input
                {...register("location")}
                className="input"
              />
            </div>

            <div>
              <label className="label">Phone </label>
              <input
                {...register("phone")}
                className="input"
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input type="email" {...register("mail")} className="input" />
            </div>
          </div>
        )}

        {/* IN REPAIR */}
        {/* {isInRepair && (
          <div className="grid grid-cols-2 gap-4 border p-4 rounded">
            <div>
              <label className="label">Service Center *</label>
              <input
                {...register("serviceCenter", { required: true })}
                className="input"
              />
            </div>

            <div>
              <label className="label">Service Center Location *</label>
              <input
                {...register("serviceCenterLocation", { required: true })}
                className="input"
              />
            </div>

            <div>
              <label className="label">Service Center Phone *</label>
              <input
                {...register("serviceCenterPhone", { required: true })}
                className="input"
              />
            </div>

            <div>
              <label className="label">Service Center Email *</label>
              <input
                type="email"
                {...register("serviceCenterEmail", { required: true })}
                className="input"
              />
            </div>

            <div className="col-span-2">
              <label className="label">Carrier Name *</label>
              <input
                {...register("carrierName", { required: true })}
                className="input"
              />
            </div>
          </div>
        )} */}

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
        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
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
