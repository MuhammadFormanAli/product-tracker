"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllCategory = () => {

    const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const res = await axios.get("/api/category");
    setCategories(res.data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirm) return;

    try {
      setLoading(true);
      await axios.delete(`/api/category/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
    return (
         <div className="p-6 bg-gray-100">
      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Link
            href="/category/add"
            className="bg-[#5C2E23] text-white px-4 py-2 rounded"
          >
            Add Category
          </Link>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Value</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id}>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.value}</td>
                <td className="p-2 border flex gap-3">
                  <Link
                    href={`/category/edit/${c._id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    disabled={loading}
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllCategory;


