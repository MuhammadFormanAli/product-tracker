"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MdAddBox,
  MdClose,
  MdDashboard,
  MdDevices,
  MdMenu,
} from "react-icons/md";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const menu = [
    { name: "Dashboard", icon: MdDashboard, href: "/dashboard" },
    { name: "Products", icon: MdDevices, href: "/" },
    { name: "Add Product", icon: MdAddBox, href: "/add-product" },
  ];
  return (
    <aside
      className={`${
        open ? "w-64" : "w-16"
      } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
    >
      {/* App Name (collapses with sidebar) */}
      <div className="h-14 flex items-center px-4 border-b border-gray-800">
        <button
          onClick={() => setOpen(!open)}
          className="relative p-2 rounded hover:bg-gray-800 transition"
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-200
      ${
        open ? "rotate-0 opacity-100 scale-100" : "rotate-90 opacity-0 scale-75"
      }`}
          >
            <MdClose className="text-xl" />
          </span>

          <span
            className={`flex items-center justify-center transition-all duration-200
      ${
        open
          ? "-rotate-90 opacity-0 scale-75"
          : "rotate-0 opacity-100 scale-100"
      }`}
          >
            <MdMenu className="text-xl" />
          </span>
        </button>

        {open && <span className="ml-3 font-semibold text-lg">MyApp</span>}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              href={item.href}
              key={item.name}
              onClick={() => !open && setOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition"
            >
              {/* Icon */}
              <span className="text-xl">
                <Icon />
              </span>

              {/* Label */}
              {open && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {/* <div className="p-4 border-t border-gray-800 text-sm">
         © {open ? " 2025 MyApp" : ""}
        </div> */}
    </aside>
  );
};

export default Sidebar;
