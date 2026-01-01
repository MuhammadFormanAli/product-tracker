"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [submittedData, setSubmittedData] = useState("");

  const onSubmit = async (data) => {
    // setSubmittedData(JSON.stringify(data, null, 2));

    const res = await axios.post("api/products", data);

    if (res?.data) {
      console.log(res?.data);
      router.push("/");
      toast.success("Product  Successfully Added ");
    } else {
      console.log("product not added");
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full grid grid-cols-2 gap-[10px] "
      >
        {/*1. Category field  */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="category">
            Category
          </label>

          <select
            {...register("category")}
            type="text"
            id="category"
            placeholder=""
            className={`w-full px-4 py-2 border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>

          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )} */}
        </div>

        {/*2. serialNumber field  */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="serialNumber">
            Serial Number
          </label>
          <input
            {...register("serialNumber", {
              required: "Serial Number is required",
            })}
            type="text"
            id="serialNumber"
            placeholder=""
            className={`w-full px-4 py-2 border ${
              errors.serialNumber ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.serialNumber.message}</p>
          )} */}
        </div>

        {/*3 brand field  */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="brand">
            Brand
          </label>
          <input
            {...register("brand")}
            type="text"
            id="brand"
            placeholder=""
            className={`w-full px-4 py-2 border ${
              errors.brand ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
          )} */}
        </div>

        {/* 4. model field  */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="model">
            Model
          </label>
          <input
            {...register("model")}
            type="text"
            id="model"
            placeholder=""
            className={`w-full px-4 py-2 border ${
              errors.model ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
          )} */}
        </div>

        {/* 5.status field  */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="status">
            Status
          </label>
          <select {...register("status")}
            type="text" id="status" placeholder="" className=
            {`w-full px-4 py-2 border ${
              errors.status ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}>
            
            <option value="">Select Status</option>
            <option value="inStock">In Stock</option>
            <option value="inUse">In Use</option>
            <option value="inRepair">In Repair</option>
            <option value="damage">Damage</option>
          </select>

          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )} */}
        </div>


        {/* 6. purchaseDate field  */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="purchaseDate">
            Purchase Date
          </label>
          <input
            {...register("purchaseDate")}
            type="date"
            id="purchaseDate"
            placeholder=""
            className={`w-full px-4 py-2 border ${
              errors.purchaseDate ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.purchaseDate.message}</p>
          )} */}
        </div>

        {/* 7. warranty field  */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="warranty">
            Warranty Period
          </label>
          <input
            {...register("warranty")}
            type="text"
            id="warranty"
            placeholder=""
            className={`w-full px-4 py-2 border ${
              errors.warranty ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.warranty.message}</p>
          )} */}
        </div>

        {/* 8. remarks field  */}
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="remarks">
            Remarks
          </label>
          <input
            {...register("remarks")}
            type="text"
            id="remarks"
            placeholder=""
            className={`w-full px-4 py-2 border ${
              errors.remarks ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.remarks.message}</p>
          )} */}
        </div>

        <input
          type="submit"
          value="Add"
          className="w-full bg-[#5C2E23] text-white py-2 rounded-md hover:bg-[#974d3b] transition"
        />
      </form>
    </div>
  );
};

export default AddProduct;
