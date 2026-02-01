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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

const AddSubCategoryDialog =({ categoryId })=> {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
     axios.post(`/api/category/${categoryId}/subcategory`, data),

    onSuccess: () => {
      toast.success("Sub-category added")

      queryClient.invalidateQueries({
        queryKey: ["category", categoryId],
      })
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      })

      reset()
      setOpen(false)
    },
    onError: () => {
      toast.error("Add failed")
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Sub Category</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sub Category</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => mutate(data))}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">
              Sub Category Name
            </label>
            <input
              {...register("name", {
                required: "Sub category name is required",
              })}
              autoComplete="off"
              className="w-full p-2 border rounded"
              placeholder="Laptops"
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



export default AddSubCategoryDialog;