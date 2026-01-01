"use client";
import React, { useEffect, useState } from "react";
import AddAssetModal from "./components/AddAssetModal";
import Link from "next/link";


const page = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
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
  
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    if (!confirm("Delete this asset?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert("Delete failed");
    }
  };


//   category create handler 
  const handleCategoryCreate = async () => {
    const res = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name:'Computer',value:'computer'}),
    });
    if (res.ok) {
     console.log('category Created successfully ')
      return { ok: true };
    }
    const err = await res.json();
    return { ok: false, error: err?.error || "Failed" };
  };


  const handleCreate = async (payload) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const created = await res.json();
      setProducts((prev) => [created, ...prev]);
      return { ok: true };
    }
    const err = await res.json();
    return { ok: false, error: err?.error || "Failed" };
  };

  const handleUpdate = async (id, payload) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)));
      return { ok: true };
    }
    return { ok: false };
  };

  const filtered = products.filter((p) => {
    if (
      query &&
      !Object.values(p).join(" ").toLowerCase().includes(query.toLowerCase())
    )
      return false;
    if (filterType && p.category !== filterType) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    return true;
  });
  return (
    <div className=" md:flex w-full max-w-[1880px]  mx-auto ">
      
     

      <main className="flex-1 ">
        {/* <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Inventory Management</h2>
          <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Asset</button>npm 
          <button onClick={handleCategoryCreate} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Category</button>
        </header> */}

        <div className="mb-4 bg-gray-50 border p-4 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-2 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search assets..."
              className="border px-3 py-2 rounded w-64"
            />
            <button
              onClick={() => {}}
              className="bg-blue-600 text-white px-3 py-2 rounded"
            >
              Search
            </button>
          </div>

          <div className="flex gap-2">
          {/* filter by category */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">Filter by Category</option>
              {categories.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
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
        <div className="overflow-x-auto bg-white border rounded shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="text-left px-4 py-3">S/N</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Brand</th>
                <th className="text-left px-4 py-3">Model</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Warranty</th>
                <th className="text-left px-4 py-3">Purchase Date</th>
                <th className="text-center px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="p-4 text-center">
                    Loading…
                  </td>
                </tr>
              )}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center">
                    No assets found
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.map((p) => (
                  <tr key={p._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{p.serialNumber}</td>
                    <td className="px-4 py-3">{p.category}</td>
                    <td className="px-4 py-3">{p.brand}</td>
                    <td className="px-4 py-3">{p.model}</td>
                    <td className="px-4 py-3 font-semibold">{p.status}</td>
                    <td className="px-4 py-3">{p.warranty || "—"}</td>
                    <td className="px-4 py-3">{p.purchaseDate || "—"}</td>

                    <td >
                      <Link href='/details' className="bg-blue-600 text-white px-3 py-2 rounded" >Details</Link>
                    </td>


                    {/* <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          const editPayload = prompt(
                            "Enter new status",
                            p.status
                          );
                          if (editPayload !== null) {
                            handleUpdate(p._id, { ...p, status: editPayload });
                          }
                        }}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      |
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        
      </main>

      <AddAssetModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
      />
    </div>


    
  );
};

export default page;
