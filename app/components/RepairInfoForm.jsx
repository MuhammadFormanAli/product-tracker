import React from "react";
import { useForm } from "react-hook-form";

const RepairInfoForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      repairStatus: "PENDING",
    },
  });

  const repairType = watch("repairType");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Repair Information</h2>

      {/* Repair Type */}
      <div className="border p-4 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Repair Type *
        </label>
        <select
          {...register("repairType", { required: "Repair type is required" })}
          className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select</option>
          <option value="INTERNAL">Internal</option>
          <option value="SERVICE_CENTER">Service Center</option>
          <option value="WARRANTY">Warranty</option>
        </select>
        {errors.repairType && (
          <p className="text-sm text-red-600 mt-1">{errors.repairType.message}</p>
        )}
      </div>

      {/* Service Center Fields */}
      {repairType === "SERVICE_CENTER" && (
        <div className="border p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "serviceCenter", label: "Service Center" },
            { name: "location", label: "Location" },
            { name: "phone", label: "Phone" },
            { name: "email", label: "Email" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                {...register(field.name)}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Carrier & Issue */}
      <div className="border p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Carrier Name
          </label>
          <input
            {...register("carrierName")}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Description
          </label>
          <textarea
            rows={3}
            {...register("issueDescription")}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="border p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sent Date *
          </label>
          <input
            type="date"
            {...register("sentDate", { required: "Sent date is required" })}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.sentDate && (
            <p className="text-sm text-red-600 mt-1">{errors.sentDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Received Date
          </label>
          <input
            type="date"
            {...register("receivedDate")}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Status & Cost */}
      <div className="border p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repair Status
          </label>
          <select
            {...register("repairStatus")}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="PENDING">Pending</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repair Cost
          </label>
          <input
            type="number"
            step="0.01"
            {...register("repairCost", { valueAsNumber: true })}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Remarks */}
      <div className="border p-4 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Remarks
        </label>
        <textarea
          rows={2}
          {...register("remarks")}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Save Repair Info
        </button>
      </div>
    </form>
  );
};

export default RepairInfoForm;
