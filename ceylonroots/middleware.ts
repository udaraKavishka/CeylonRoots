import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl.clone();
  const adminUrl =
    process.env.NEXT_PUBLIC_ADMIN_URL || "http://admin.localhost:3001";

  const isAdminSubdomain =
    hostname.startsWith("admin.localhost") || hostname.startsWith("admin.");

  if (isAdminSubdomain) {
    const redirectTarget = `${adminUrl}${url.pathname}${url.search}`;
    return NextResponse.redirect(redirectTarget);
  }

  // On the main domain, redirect /admin routes to Flask admin
  if (url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
