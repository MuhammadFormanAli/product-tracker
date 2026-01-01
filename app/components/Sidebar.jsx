
'use client'

import Link from "next/link";
import { useState } from "react";


const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const menu = [
    { name: "Dashboard", icon: "🏠",href:'/dashboard' },
    { name: "Products", icon: "📦",href:'/' },
    { name: "Add Product", icon: "📦",href:'/add-product' },

  ]
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
            className="p-2 rounded hover:bg-gray-800"
          >
            ☰
          </button>

          {open && (
            <span className="ml-3 font-semibold text-lg">
              MyApp
            </span>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menu.map((item) => (
            <Link
            href={item.href}
              key={item.name}
              onClick={() => !open && setOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition"
            >
              <span className="text-xl">{item.icon}</span>
              {open && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        {/* <div className="p-4 border-t border-gray-800 text-sm">
         © {open ? " 2025 MyApp" : ""}
        </div> */}
      </aside>
    );
};

export default Sidebar;