// components/productColumns.js
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

const columnHelper = createColumnHelper();
const statusStyles = {
  inUse: "text-blue-700 bg-blue-100",
  inStock: "text-green-700 bg-green-100",
  inRepair: "text-yellow-700 bg-yellow-100",
  damage: "text-red-700 bg-red-100",
};

export const productColumns = [



  columnHelper.accessor("serialNumber", {
    header: "Serial No",
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("brand", {
    header: "Brand",
  }),

  columnHelper.accessor("model", {
    header: "Model",
  }),

columnHelper.accessor("status", {
  header: "Status",
  cell: (info) => {
    const status = info.getValue();

    return (
      <span
        className={`capitalize px-3 py-1 rounded-full text-xs font-semibold
          ${statusStyles[status] || "text-gray-600 bg-gray-100"}`}
      >
        {status.replace(/([A-Z])/g, " $1")}
      </span>
    );
  },
}),



  columnHelper.accessor("purchaseDate", {
    header: "Purchase Date",
    cell: (info) =>
      new Date(info.getValue()).toLocaleDateString(),
  }),

columnHelper.display({
  id: "actions",
  header: "Actions",
  cell: ({ row }) => (
  <Link
    href={`/products/${row.original._id}`}
    className="text-white  font-medium  px-2 py-[6px] bg-blue-500 rounded "
  >
    Details
  </Link>
)

})





];
