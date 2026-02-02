"use client"

import axios from "axios"
import { toast } from "react-toastify"
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"


import Loading from "../loading"
import AddBrandDialog from "../components/AddBrandDialog"


export default function AllBrand() {
  const queryClient = useQueryClient()

  // 🔹 Fetch categories
  const {
    data: brands = [],
    isLoading,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await axios.get("/api/brand")
      return data
    },
  })

  

  if (isLoading) {
    return <Loading />
  }

  return (
   <div className="p-6 bg-gray-100">
  <div className="bg-white p-4 rounded shadow">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Brands</h2>
      <AddBrandDialog />
    </div>

    {brands.length > 0 ? (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <div
            key={b._id}
            className="bg-gray-50 border rounded-lg p-4 flex flex-col justify-between"
          >
            {/* Brand Name */}
            <h3 className="text-lg font-medium text-gray-800 mb-4 capitalize">
              {b.name}
            </h3>


          </div>
        ))}
      </div>
    ) : (
      <div className="p-6 text-center text-gray-500">
        No Brands Found
      </div>
    )}
  </div>
</div>

  )
}
