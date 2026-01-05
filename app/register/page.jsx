"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [submittedData, setSubmittedData] = useState("");

  const onSubmit = async (data) => {
    // setSubmittedData(JSON.stringify(data, null, 2));

  

    const res = await axios.post("http://172.22.90.22:3000/api/auth/register", data);

    if (res?.data) router.push("/dashboard");
    console.log(res)

    // if (res?.data?.userRole === "admin") {
    //   localStorage.setItem("userRole", "admin");
    //   toast.success("Register Successful ");
    //   router.push("/");
    // } else {
    //   localStorage.clear();
    //   toast.error(res.data.message);
    // }



    console.log('response from res',res.data.message)
  };

  return (
    <div className="h-full flex items-center justify-center bg-[url('/login-bg.jpg')]  bg-cover bg-no-repeat bg-center ">
      <div className="bg-[#00000071] h-full w-full flex items-center justify-center ">
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#ffffff10] p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 backdrop-blur-2xl text-white"
      >
        <h2 className="text-2xl font-bold  text-center">
          Register
        </h2>

        <div>
          <label className="block  mb-1" htmlFor="adminName">
            Name
          </label>
          <input
            {...register("adminName", { required: "Name is required" })}
            type="text"
            id="adminName"
            placeholder="John Doe"
            className={`w-full px-4 py-2 border ${
              errors.adminName ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )} */}
        </div>
        <div>
          <label className="block  mb-1" htmlFor="employeeId">
            Employee ID
          </label>
          <input
            {...register("employeeId", { required: "ID is required" })}
            type="text"
            id="employeeId"
            placeholder="123456"
            className={`w-full px-4 py-2 border ${
              errors.employeeId ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* {errors.employeeId && (
            <p className="text-red-500 text-sm mt-1">{errors.employeeId.message}</p>
          )} */}
        </div>
        <div>
          <label className="block  mb-1" htmlFor="password">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
            placeholder="••••••••"
            className={`w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <input
          type="submit"
          value="Register"
          className="w-full bg-[#5C2E23] text-white py-2 rounded-md hover:bg-blue-700 transition"
        />

        {/* {submittedData && (
          <pre className="bg-gray-100 p-4 text-sm rounded text-gray-700 mt-4">
            {submittedData}
          </pre>
        )} */}
        <p>
          Already Have Account{" "}
          <Link className="underline text-[#5C2E23]" href="/login">
            Login
          </Link>
        </p>
      </form>
      </div>
    </div>
  );
};

export default Register;
