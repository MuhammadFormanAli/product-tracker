"use client";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";

const ServiceCenterRepairSuccess = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      returnTo: "STOCK",
    },
  });

  const submit = async (data) => {
    const res = await axios.patch(
      `/api/products/${id}/repair/service-center/success`,
      data,
    );
    router.push(`/products/${id}/details`);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Service Center Repair Success
      </h2>

      {/* Repaired By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Remark
        </label>
        <input
          {...register("remarks")}
          className="w-full p-2 border rounded-md"
          placeholder="Remarks"
        />
      </div>

      {/* Received Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Received Date *
        </label>
        <input
          type="date"
          {...register("receivedDate", {
            required: "Received date is required",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.receivedDate && (
          <p className="text-sm text-red-600 mt-1">
            {errors.receivedDate.message}
          </p>
        )}
      </div>
      {/* Delivery Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Delivery Date *
        </label>
        <input
          type="date"
          {...register("deliveryDate", {
            required: "Delivery date is required",
          })}
          className="w-full p-2 border rounded-md"
        />
        {errors.deliveryDate && (
          <p className="text-sm text-red-600 mt-1">
            {errors.deliveryDate.message}
          </p>
        )}
      </div>

      {/* Return To */}
      <div className="border p-4 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Return Asset To *
        </label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" value="USER" {...register("returnTo")} />
            User
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" value="STOCK" {...register("returnTo")} />
            Stock
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Complete Repair
        </button>
      </div>
    </form>
  );
};

export default ServiceCenterRepairSuccess;
