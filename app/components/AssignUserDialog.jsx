"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AssignUserDialog({
  id,
  open,
  setOpen,
}) {
  const queryClient = useQueryClient();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      axios.put(`/api/products/${id}/assign-user`, data),

    onSuccess: () => {
      toast.success("User assigned successfully");

      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      reset();
      setOpen(false);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Assignment failed"
      );
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign User</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => mutate(data))}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">
              User Name
            </label>
            <input
              {...register("userName", {
                required: "User name is required",
              })}
              className="w-full p-2 border rounded"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Employee ID
            </label>
            <input
              {...register("employeeId", {
                required: "Employee ID is required",
              })}
              className="w-full p-2 border rounded"
            />
            {errors.employeeId && (
              <p className="text-red-500 text-sm">
                {errors.employeeId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Designation
            </label>
            <input
              {...register("designation")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Location
            </label>
            <input
              {...register("location")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Phone
            </label>
            <input
              {...register("phone")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Assigning..." : "Assign"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
