
"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";


const AddCategory = () => {
const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post("/api/category", { name, value });
      toast.success("Category added successfully");
      setName("");
      setValue("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


    return (
        <div className="bg-gray-100 p-6 h-full w-full flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>

        <form onSubmit={handleSubmit} className=" flex gap-[10px] items-center flex-col w-full min-w-sm">
          <div className="w-full">
            <label className="block mb-1">Category Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Laptop"
            />
          </div>

          <div className="w-full">
            <label className="block mb-1">Category Value *</label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input"
              placeholder="laptop"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#5C2E23] text-white py-2 rounded hover:bg-[#974d3b] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Category"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
    );
};

export default AddCategory;






