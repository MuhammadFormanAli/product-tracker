"use client"

import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Loading from "../loading"

export default function EditCategoryDialog({ id }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // 🔹 Fetch single category
  const { isLoading } = useQuery({
    queryKey: ["category", id],
    enabled: open,
    queryFn: async () => {
      const { data } = await axios.get(`/api/category/${id}`)
      reset(data)
      return data
    },
  })

  // 🔹 Update category
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => axios.put(`/api/category/${id}`, data),
    onSuccess: () => {
      toast.success("Category updated")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      queryClient.invalidateQueries({ queryKey: ["category", id] })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed")
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <Loading />
        ) : (
          <form
            onSubmit={handleSubmit((data) => mutate(data))}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">
                Category Name
              </label>
              <input
                {...register("name", {
                  required: "Category name is required",
                })}
                className="w-full p-2 border rounded"
                autoComplete="off"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
