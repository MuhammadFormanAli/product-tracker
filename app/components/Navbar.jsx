"use client";

import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  // console.log('logged user',user)

  const logout = async () => {
    const res = await axios.post("/api/auth/logout");
    if (res?.data) router.push("/login");
    //  console.log(res)
  };

  return (
    <div>
      {pathname === "/login" || pathname === "/register" ? (
        ""
      ) : (
        <div className="h-14 bg-white border-b flex items-center gap-4 justify-center flex-row px-4 shadow-sm">
          <h1 className="font-semibold text-lg">Product Tracker</h1>

          <div className="ml-auto flex items-center justify-center gap-2">
            <div>
              <p className="capitalize">{user?.adminName}</p>
              <p>{user?.employeeId}</p>
            </div>

            <button
              className="flex items-center justify-center rounded-full bg-red-500 py-1  px-4 font-bold text-white transition hover:bg-red-600 active:scale-95"
              onClick={logout}
            >
              {" "}
              <FiLogOut />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
