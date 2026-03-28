import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  const isAdminSubdomain =
    hostname.startsWith("admin.localhost") || hostname.startsWith("admin.");

  if (isAdminSubdomain) {
    // Rewrite admin subdomain requests to /admin/* routes
    if (url.pathname === "/" || url.pathname === "") {
      url.pathname = "/admin";
      return NextResponse.rewrite(url);
    }
    // Allow /admin/*, /api/*, and Next.js internals through
    if (
      !url.pathname.startsWith("/admin") &&
      !url.pathname.startsWith("/api") &&
      !url.pathname.startsWith("/_next") &&
      !url.pathname.startsWith("/favicon")
    ) {
      url.pathname = `/admin${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // On the main domain, block direct access to /admin routes
  if (url.pathname.startsWith("/admin")) {
    const adminUrl =
      process.env.NEXT_PUBLIC_ADMIN_URL || "http://admin.localhost:3009";
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
