"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import toast from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/auth/register", 
        data,
        { withCredentials: true }
      );

      toast.success(res.data?.message || "Registered successfully");
    
      router.push("/dashboard");
    } catch (error) {
      // Axios error handling
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";

        toast.error(message);
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-[url('/login-bg.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="bg-[#00000071] h-full w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#ffffff10] p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 backdrop-blur-2xl text-white"
        >
          <h2 className="text-2xl font-bold text-center">Register</h2>

          {/* Name */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              {...register("adminName", { required: "Name is required" })}
              className={`w-full px-4 py-2 border ${
                errors.adminName ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.adminName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.adminName.message}
              </p>
            )}
          </div>

          {/* Employee ID */}
          <div>
            <label className="block mb-1">Employee ID</label>
            <input
              {...register("employeeId", {
                required: "Employee ID is required",
              })}
              className={`w-full px-4 py-2 border ${
                errors.employeeId ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.employeeId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.employeeId.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#5C2E23] py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center">
            Already have an account?{" "}
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
