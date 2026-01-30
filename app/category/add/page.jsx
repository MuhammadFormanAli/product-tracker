"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/category", { name: data.name });
      toast.success("Category added successfully");
      reset(); // clears form
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 h-full w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="w-full">
            <label className="block mb-1 font-medium">Category Name *</label>
            <input
              {...register("name", { required: "Category name is required" })}
              className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-[#5C2E23]"
              placeholder="Laptop"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-[#5C2E23] text-white py-2 rounded hover:bg-[#974d3b] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
