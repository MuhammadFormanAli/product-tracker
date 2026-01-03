'use client'

import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div>
      {pathname === "/login" || pathname === "/register" ? (
        ""
      ) : (
        <div className="h-14 bg-white border-b flex items-center px-4 shadow-sm">
          <h1 className="font-semibold text-lg">Product Tracker</h1>

          <div className="ml-auto">
            <div className="h-8 w-8 bg-gray-300 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
