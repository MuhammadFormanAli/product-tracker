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
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <AddCategoryDialog />
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id}>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border flex gap-3">
                  <EditCategoryDialog id={c._id} />

                  <button
                    onClick={() => handleDelete(c._id)}
                    disabled={isPending}
                    className="text-red-600 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
