import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";


export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const authPages = ["/login", "/register"];

  if (!token && !authPages.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && authPages.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (path.startsWith("/super-admin")) {
    const user = verifyToken(token);
    if (user?.role !== "super_admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }
console.log("Middleware running:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
