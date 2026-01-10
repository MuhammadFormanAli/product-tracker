"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function EditCategory() {
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      value: "",
    },
  });

  // ✅ Fetch single category
  const { isLoading } = useQuery({
    queryKey: ["category", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(`/api/category/${id}`);
      reset(res.data);
      return res.data;
    },
    onError: () => {
      toast.error("Failed to load category");
      router.push("/category");
    },
  });

  // ✅ Update category
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return axios.put(`/api/category/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Category updated");
      router.push("/category");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading category...</div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              {...register("name", { required: "Category name is required" })}
              className="input"
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="error">{errors.name.message}</p>
            )}
          </div>

          {/* Category Value */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category Value
            </label>
            <input
              {...register("value", { required: "Category value is required" })}
              className="input"
              placeholder="Enter category value"
            />
            {errors.value && (
              <p className="error">{errors.value.message}</p>
            )}
          </div>

          <button
            disabled={isPending}
            className="w-full bg-[#5C2E23] text-white py-2 rounded disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
        }
        .error {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
}
