"use client"

import axios from "axios"
import { toast } from "react-toastify"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import AddCategoryDialog from "../components/AddCategoryDialog"
import EditCategoryDialog from "../components/EditCategoryDialog"
import Loading from "../loading"
import Link from "next/link"

export default function AllCategory() {
  const queryClient = useQueryClient()

  // 🔹 Fetch categories
  const {
    data: categories = [],
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("/api/category")
      return data
    },
  })

  // 🔹 Delete category
  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: (id) => axios.delete(`/api/category/${id}`),
    onSuccess: () => {
      toast.success("Category deleted")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete failed")
    },
  })

  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return
    deleteCategory(id)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
   <div className="p-6 bg-gray-100">
  <div className="bg-white p-4 rounded shadow">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Categories</h2>
      <AddCategoryDialog />
    </div>

    {categories.length > 0 ? (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c._id}
            className="bg-gray-50 border rounded-lg p-4 flex flex-col justify-between"
          >
            {/* Category Name */}
            <h3 className="text-lg font-medium text-gray-800 mb-4 capitalize">
              {c.name}
            </h3>

            {/* Actions */}
            <div className="flex gap-2 items-center mt-auto">
  <EditCategoryDialog id={c._id} />

  <button
    onClick={() => handleDelete(c._id)}
    disabled={isPending}
    className="px-3 py-1.5 text-sm rounded-md border border-red-200 
               text-red-600 hover:bg-red-50 hover:border-red-300
               transition disabled:opacity-50"
  >
    Delete
  </button>

  <Link
    href={`/category/${c._id}/details`}
    className="px-3 py-1.5 text-sm rounded-md border border-blue-200
               text-blue-600 hover:bg-blue-50 hover:border-blue-300
               transition"
  >
    Details
  </Link>
</div>

          </div>
        ))}
      </div>
    ) : (
      <div className="p-6 text-center text-gray-500">
        No categories found
      </div>
    )}
  </div>
</div>

  )
}
