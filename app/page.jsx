

// using react query



"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import AddAssetModal from "./components/AddAssetModal";

const Page = () => {
  const queryClient = useQueryClient();

  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ================= PRODUCTS ================= */
  const {
    data: products = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("/api/products");
      return res.data;
    },
  });

  /* ================= CATEGORIES ================= */
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("/api/category");
      return res.data;
    },
  });

  /* ================= CREATE PRODUCT ================= */
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post("/api/products", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowModal(false);
    },
  });

  /* ================= DELETE PRODUCT ================= */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = (id) => {
    if (confirm("Delete this asset?")) {
      deleteMutation.mutate(id);
    }
  };

  /* ================= FILTER ================= */
  const filteredProducts = products.filter((p) => {
    if (
      query &&
      !Object.values(p)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    )
      return false;

    if (filterType && p.category !== filterType) return false;
    if (filterStatus && p.status !== filterStatus) return false;

    return true;
  });

  /* ================= STATES ================= */
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading assets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">Failed to load data</p>
      </div>
    );
  }

  /* ================= UI ================= */
 return (
    <div className="w-full max-w-[1880px] mx-auto p-4">
      <main className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Inventory Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Asset
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mb-4 bg-gray-50 border p-4 rounded flex flex-wrap gap-4 justify-between">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets..."
            className="border px-3 py-2 rounded w-64"
          />

          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">Filter by Category</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">Filter by Status</option>
              <option>In Stock</option>
              <option>In Use</option>
              <option>In Repair</option>
              <option>Damage</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white border rounded shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">S/N</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">Model</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No assets found
                  </td>
                </tr>
              )}

              {filteredProducts.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{p.serialNumber}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.brand}</td>
                  <td className="px-4 py-3">{p.model}</td>
                  <td className="px-4 py-3 font-semibold">{p.status}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Link
                      href="/details"
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      <AddAssetModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={(payload) => createMutation.mutate(payload)}
      />
    </div>
  );
};

export default Page;