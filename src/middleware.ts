import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./utils/validateToken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const isValid = await validateToken(
    token || "",
    process.env.JWT_SECRET as string,
  );

  if (req.nextUrl.pathname === "/login") {
    if (token && isValid) {
      return NextResponse.redirect(new URL("/blog/my-blogs", req.url));
    }
  }

  if (
    req.nextUrl.pathname.startsWith("/blog") ||
    req.nextUrl.pathname.startsWith("/profile")
  ) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    if (!isValid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/blog", "/blog/:path*", "/profile", "/profile/:path*"],
};
