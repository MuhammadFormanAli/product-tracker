"use client"

import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
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

export default function AddCategoryDialog() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => axios.post("/api/category", data),
    onSuccess: () => {
      toast.success("Category added")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      reset()
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Add failed")
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

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
              placeholder="Laptop"
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
              {isPending ? "Saving..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
