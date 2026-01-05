'use client'

import { Button } from "@/components/ui/button";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";

const Navbar = ({user}) => {
  const pathname = usePathname();
   const router = useRouter();
  console.log('logged user',user?.adminName)

  const logout = async ()=>{
   const res = await axios.post('/api/auth/logout')
   
    if (res?.data) router.push("/login");
  

   console.log(res)
  }

  return (
    <div>
      {pathname === "/login" || pathname === "/register" ? (
        ""
      ) : (
        <div className="h-14 bg-white border-b flex items-center px-4 shadow-sm">
          <h1 className="font-semibold text-lg">Product Tracker</h1>

          <div className="ml-auto">
            <div className="h-8 w-8 bg-gray-300 rounded-full" />
          <button onClick={logout} >log out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
