"use client";

import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Link from "next/link";
import Loading from "../loading";

ChartJS.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
);

export default function DashboardPage() {
  const ADMINS = [
    {
      name: "System Admin",
      role: "Super Admin",
      email: "admin@company.com",
      access: "Full",
    },
    {
      name: "IT Manager",
      role: "Asset Manager",
      email: "it.manager@company.com",
      access: "Repair & Assign",
    },
    {
      name: "Store Keeper",
      role: "Inventory",
      email: "store@company.com",
      access: "Stock Only",
    },
  ];

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <Loading />;

  const filteredProducts = filter
    ? data.products.filter((p) => p.status === filter)
    : data.products;

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  /* ---------------- CHART DATA ---------------- */
  const statusChart = {
    labels: ["In Stock", "In Use", "In Repair", "Damaged"],
    datasets: [
      {
        data: [
          data.kpis.inStock,
          data.kpis.inUse,
          data.kpis.inRepair,
          data.kpis.damage,
        ],
        backgroundColor: ["#22c55e", "#3b82f6", "#eab308", "#ef4444"],
      },
    ],
  };

  const categoryChart = {
    labels: Object.keys(data.charts.byCategory),
    datasets: [
      {
        data: Object.values(data.charts.byCategory),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* KPI */}
      {/* KPI */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
  <KPI
    label="Total"
    value={data?.kpis?.total ?? 0}
    color="bg-gray-100 text-gray-800"
    onClick={() => setFilter(null)}
  />
  <KPI
    label="In Stock"
    value={data?.kpis?.inStock ?? 0}
    color="bg-green-100 text-green-700"
    onClick={() => setFilter("inStock")}
  />
  <KPI
    label="In Use"
    value={data?.kpis?.inUse ?? 0}
    color="bg-blue-100 text-blue-700"
    onClick={() => setFilter("inUse")}
  />
  <KPI
    label="In Repair"
    value={data?.kpis?.inRepair ?? 0}
    color="bg-yellow-100 text-yellow-700"
    onClick={() => setFilter("inRepair")}
  />
  <KPI
    label="Damaged"
    value={data?.kpis?.damage ?? 0}
    color="bg-red-100 text-red-700"
    onClick={() => setFilter("damage")}
  />
</div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Assets by Status">
          <div className="h-56 max-w-xs mx-auto">
            <Pie
              data={statusChart}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </div>
        </Card>

        <Card title="Assets by Category">
          <div className="h-56">
            <Bar
              data={categoryChart}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </Card>
      </div>

      {/* SLA */}
      <Card title="🚨 SLA Breaches">
        {data?.slaBreaches?.length === 0 ? (
          <p className="text-sm text-gray-500">No SLA breaches 🎉</p>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {data?.slaBreaches?.map((b, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-2 border rounded hover:bg-red-50 transition"
              >
                <div>
                  <p className="font-semibold text-red-700">
                    {b?.serialNumber ?? "Unknown Asset"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {b?.repairType ?? "-"} — Assigned to:{" "}
                    {b?.assignedUser?.userName ?? "-"}
                  </p>
                </div>
                <span className="text-sm font-medium text-red-600">
                  {b?.days ?? 0} day{b?.days > 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="👨‍💼 System Administrators">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Access</th>
            </tr>
          </thead>
          <tbody>
            {ADMINS.map((a, i) => (
              <tr key={i}>
                <td className="p-2 border">{a.name}</td>
                <td className="p-2 border">{a.role}</td>
                <td className="p-2 border">{a.email}</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    {a.access}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="p-3 border text-left">Serial No</th>
                <th className="p-3 border text-left">Category</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {paginatedProducts.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border font-medium">{p.serialNumber}</td>

                  <td className="p-3 border">{p.category}</td>

                  {/* Status Badge */}
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    p.status === "inStock"
                      ? "bg-green-100 text-green-700"
                      : p.status === "inUse"
                        ? "bg-blue-100 text-blue-700"
                        : p.status === "inRepair"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                  }
                `}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`products/${p._id}/details`}
                        className="px-3 py-1.5 text-xs font-medium rounded
                             bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Details
                      </Link>

                      <button
                        //   onClick={() => handleDelete(p._id)}
                        className="px-3 py-1.5 text-xs font-medium rounded
                             bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 px-4 py-3 border-t bg-gray-50">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-1.5 border rounded text-sm
                 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>

          <span className="text-sm text-gray-600">
            Page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1.5 border rounded text-sm
                 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function KPI({ label, value, color = "bg-white text-black", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded shadow cursor-pointer hover:ring transition ${color}`}
    >
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-2xl font-bold">{value}</p>
        {/* Optional colored bar indicator */}
        <div className={`flex-1 h-1 rounded ${color.split(" ")[0]}`}></div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

function RepairTimeline({ repairInfo = [] }) {
  if (!repairInfo.length) return <span className="text-gray-400">—</span>;

  return (
    <ul className="text-xs space-y-1">
      {repairInfo.map((r, i) => (
        <li key={i}>
          {r.repairType} — {r.repairStatus}
        </li>
      ))}
    </ul>
  );
}
