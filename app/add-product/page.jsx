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
    watch,
    formState: { errors },
  } = useForm();
  // const [submittedData, setSubmittedData] = useState("");

  const status = watch("status");
  //   console.log(status);

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
        className="bg-white p-8 rounded-lg shadow-md w-full flex flex-col gap-[20px] "
      >
        <div className="grid grid-cols-2 gap-[10px] border p-2">
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

          {/* 5. purchaseDate field  */}
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

          {/* 6. warranty field  */}
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

          {/* 7. remarks field  */}
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
        </div>

        {/* 8.status field  */}

        {/* Status radio fields */}
        <div className="flex gap-[20px]">
          <div className="flex gap-[10px] items-center justify-center">
            <label htmlFor="inUse">In Use</label>
            <input
              {...register("status")}
              type="radio"
              id="inUse"
              value="inUse"
            />
          </div>

          <div className="flex gap-[10px] items-center justify-center">
            <label htmlFor="inRepair">In Repair</label>
            <input
              {...register("status")}
              type="radio"
              id="inRepair"
              value="inRepair"
            />
          </div>

          <div className="flex gap-[10px] items-center justify-center">
            <label htmlFor="damage">Damage</label>
            <input
              {...register("status")}
              type="radio"
              id="damage"
              value="damage"
            />
          </div>
        </div>

        {/* In Use Form Section */}
        <div
          className={`overflow-hidden transition-all duration-1000 grid grid-cols-2 gap-[10px] border p-2 
    ${status === "inUse" ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
  `}
        >
          <div className="">
            {/* 1. User Name field  */}
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="userName">
                User Name
              </label>
              <input
                {...register("userName", {
                  required: " Name is required",
                })}
                type="text"
                id="userName"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.userName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
          )} */}
            </div>
          </div>


          <div className="">           
            {/* 2. Employee Id field  */}
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="employeeId">
                Employee Id
              </label>
              <input
                {...register("employeeId", {
                  required: " Id is required",
                })}
                type="text"
                id="employeeId"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.userName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.employeeId.message}</p>
          )} */}
            </div>
          </div>


          <div className="">
            {/* 3. location field  */}
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="location">
                Location
              </label>
              <input
                {...register("location", {
                  required: " Name is required",
                })}
                type="text"
                id="location"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
          )} */}
            </div>
          </div>


          <div className="">
            {/* 4. Designation field  */}
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="designation">
               Designation
              </label>
              <input
                {...register("designation", {
                  required: " Designation is required",
                })}
                type="text"
                id="designation"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.designation ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
          )} */}
            </div>
          </div>


          <div className="">
            {/* 5. phone number field  */}
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                {...register("phone", {
                  required: " Phone is required",
                })}
                type="text"
                id="phone"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )} */}
            </div>
          </div>


          <div className="">
            {/* 5. Email number field  */}
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="mail">
                Email
              </label>
              <input
                {...register("mail", {
                  required: " Mail is required",
                })}
                type="text"
                id="mail"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.mail ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.mail.message}</p>
          )} */}
            </div>
          </div>

        </div>



        {/* In Repair Form Section */}
        <div
          className={`overflow-hidden transition-all duration-1000 grid grid-cols-2 gap-[10px] border p-2
    ${status === "inRepair" ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
  `}
        >
          <div className="">
            {/* 1. Service Center name field  */}
            <div>
              <label
                className="block text-gray-700 mb-1"
                htmlFor="serviceCenter"
              >
                Name
              </label>
              <input
                {...register("serviceCenter", {
                  required: "Service Center Name is required",
                })}
                type="text"
                id="serviceCenter"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.serviceCenter ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.serviceCenter.message}</p>
          )} */}
            </div>
          </div>


          <div className="">
            {/* 2. Service Center location  */}
            <div>
              <label
                className="block text-gray-700 mb-1"
                htmlFor="serviceCenterLocation"
              >
                Location
              </label>
              <input
                {...register("serviceCenterLocation", {
                  required: "Service Center Location is required",
                })}
                type="text"
                id="serviceCenterLocation"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.serviceCenterLocation ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.serviceCenterLocation.message}</p>
          )} */}
            </div>
          </div>


          <div className="">
            {/* 3. Service Center phone  */}
            <div>
              <label
                className="block text-gray-700 mb-1"
                htmlFor="serviceCenterPhone"
              >
                Phone
              </label>
              <input
                {...register("serviceCenterPhone", {
                  required: "Service Center Phone is required",
                })}
                type="text"
                id="serviceCenterPhone"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.serviceCenterPhone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.serviceCenterPhone.message}</p>
          )} */}
            </div>
          </div>


          <div className="">
            {/* 4. Service Center email  */}
            <div>
              <label
                className="block text-gray-700 mb-1"
                htmlFor="serviceCenterEmail"
              >
                 Email
              </label>
              <input
                {...register("serviceCenterEmail", {
                  required: "Service Center Email is required",
                })}
                type="text"
                id="serviceCenterEmail"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.serviceCenterEmail ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.serviceCenterEmail.message}</p>
          )} */}
            </div>
          </div>

          <div className="">
            {/* 1. carrier Name */}
            <div>
              <label
                className="block text-gray-700 mb-1"
                htmlFor="carrierName"
              >
                Carrier Name
              </label>
              <input
                {...register("carrierName", {
                  required: "Carrier Name is required",
                })}
                type="text"
                id="carrierName"
                placeholder=""
                className={`w-full px-4 py-2 border ${
                  errors.carrierName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {/* {errors.carrierName && (
            <p className="text-red-500 text-sm mt-1">{errors.carrierName.message}</p>
          )} */}
            </div>
          </div>

          

         


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
