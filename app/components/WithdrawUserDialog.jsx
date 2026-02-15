"use client";

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function WithdrawUserDialog({ id, open, setOpen }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => axios.put(`/api/products/${id}/withdraw`),

    onSuccess: () => {
      toast.success("User withdrawn successfully");

      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      setOpen(false);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Withdraw failed");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw Product?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          This will remove the assigned user and move them to previous users
          history.
        </p>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Confirm Withdraw"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
