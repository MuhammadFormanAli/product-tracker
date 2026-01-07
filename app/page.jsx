"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { productColumns } from "./components/productColumns";
import { useProducts } from "@/hooks/useProducts";
import Loading from "./loading";

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isFetching } = useProducts({
    page,
    search,
    status,
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search serial / brand / model"
          className="border px-3 py-2 rounded w-full"
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="inStock">In Stock</option>
          <option value="inUse">In Use</option>
          <option value="inRepair">In Repair</option>
          <option value="damage">Damage</option>
        </select>
        
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="p-2 border">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {/* Loading State */}
          {isLoading || isFetching ? (
            <tr>
              <td
                colSpan={productColumns.length}
                className="p-6 text-center"
              >
                <Loading />
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            /* Empty State */
            <tr>
              <td
                colSpan={productColumns.length}
                className="p-6 text-center text-gray-500"
              >
                No products found
              </td>
            </tr>
          ) : (
            /* Data Rows */
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1 || isFetching}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {data?.pagination?.page ?? 1} of{" "}
          {data?.pagination?.totalPages ?? 1}
        </span>

        <button
          disabled={
            page === data?.pagination?.totalPages || isFetching
          }
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
