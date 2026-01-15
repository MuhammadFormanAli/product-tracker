"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";


const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit  = async (data) => {

 

    const res = await axios.post('http://172.22.90.22:3000/api/auth/login', data)
    console.log(res)
    if(res?.data){
      router.push('/dashboard')
      window.location.reload();
    }

  };

  return (
    <div className="h-full flex items-center justify-center bg-[url('/login-bg.jpg')]  bg-cover bg-no-repeat bg-center ">
      <div className="bg-[#00000071] h-full w-full flex items-center justify-center ">
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#ffffff10] p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 backdrop-blur-2xl text-white"
      >
        <h2 className="text-2xl font-bold text-white text-center">Login</h2>

        <div>
          <label className="block  mb-1" htmlFor="employeeId">
            Employee Id
          </label>
          <input
            {...register("employeeId", { required: "Employee Id is required" })}
            type="text"
            id="employeeId"
            placeholder=""
            className={`w-full px-4 py-2 border ${
              errors.employeeId ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.employeeId && (
            <p className="text-red-500 text-sm mt-1">{errors.employeeId.message}</p>
          )}
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
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <input
          type="submit"
          value="Log In"
          className="w-full bg-[#5C2E23] text-white py-2 rounded-md hover:bg-blue-700 transition"
        />
        <p>Don't Have Account <Link className="underline text-[#5C2E23]" href="/register">Register</Link></p>
      </form>
      </div>
    </div>
  );
};

export default Login;

