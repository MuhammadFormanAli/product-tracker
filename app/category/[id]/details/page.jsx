"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import AddSubCategoryDialog from "@/app/components/AddSubCategoryDialog"
import { toast } from "react-toastify"

const CategoryDetails = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()

  // 🔹 Fetch category
  const { data: category, isLoading } = useQuery({
    queryKey: ["category", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get(`/api/category/${id}`)
      return data
    },
  })

  // 🔹 Delete subcategory
  const { mutate: deleteSubCategory, isPending } = useMutation({
    mutationFn: (subcategoryId) =>
      axios.delete(`/api/category/${id}/subcategory/${subcategoryId}`),

    onSuccess: () => {
      toast.success("Subcategory deleted")

      // ✅ refresh THIS category only
      queryClient.invalidateQueries({
        queryKey: ["category", id],
      })
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete failed")
    },
  })

  const handleDeleteSubCategory = (subcategoryId) => {
    if (!window.confirm("Delete this subcategory?")) return
    deleteSubCategory(subcategoryId)
  }

  if (isLoading) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* CATEGORY HEADER */}
      <div className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{category?.name}</h2>
      </div>

      {/* SUB-CATEGORIES */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Sub Categories</h3>
          <AddSubCategoryDialog categoryId={id} />
        </div>

        {category?.subCategories?.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.subCategories.map((s) => (
              <div
                key={s._id}
                className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-gray-800">
                    {s.name}
                  </h4>
                </div>

                <button
                  disabled={isPending}
                  onClick={() => handleDeleteSubCategory(s._id)}
                  className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No sub-categories found
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryDetails
