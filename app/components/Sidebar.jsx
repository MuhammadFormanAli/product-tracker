"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MdAddBox,
  MdClose,
  MdDashboard,
  MdDevices,
  MdMenu,
} from "react-icons/md";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  // Hide sidebar on auth pages
  const hideSidebar = pathname === "/login" || pathname === "/register";
  if (hideSidebar) return null;

  const menu = [
    { name: "Dashboard", icon: MdDashboard, href: "/dashboard" },
    { name: "Products", icon: MdDevices, href: "/" },
    { name: "Add Product", icon: MdAddBox, href: "/add-product" },
  ];

  return (
    <aside
      className={`
        ${open ? "w-64" : "w-16"}
         text-white 
        transition-[width] duration-500 ease-in-out
        flex flex-col h-screen overflow-hidden bg-black
      `}
    >
      {/* Header */}
      <div className="h-14 flex items-center px-4 border-b bg-[#5D2E23]  backdrop-blur-2xl">
        <button
          onClick={() => setOpen(!open)}
          className="relative p-2 rounded hover:bg-gray-800 transition border"
        >
          {/* Close Icon */}
          <span
            className={`
              absolute inset-0 flex items-center justify-center 
              transition-all duration-300
              ${
                open
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-75"
              }
            `}
          >
            <MdClose className="text-xl  " />
          </span>

          {/* Menu Icon */}
          <span
            className={`
              flex items-center justify-center
              transition-all duration-300
              ${
                open
                  ? "opacity-0 -rotate-90 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              }
            `}
          >
            <MdMenu className="text-xl" />
          </span>
        </button>

        {/* App Name */}
        <Image
      src="/logo.png"
      width={70}
      height={70}
      alt="Picture of the author"
      className={`
            ml-3 font-semibold text-lg whitespace-nowrap
            transition-all duration-300 ease-in-out border
            ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4    "}
          `}
    />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-1 bg-[#000000b7]  ">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => !open && setOpen(true)}
              className={`
                group flex items-center gap-3 px-3 py-2 rounded-md
                transition-all duration-300
                ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700"}
              `}
            >
              {/* Icon */}
              <Icon className="text-xl shrink-0 transition-transform duration-300 group-hover:scale-110" />

              {/* Label */}
              <span
                className={`
                  whitespace-nowrap transition-all duration-300
                  ${
                    open
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }
                `}
              >
                {item.name}
              </span>
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
