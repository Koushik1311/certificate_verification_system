import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshAccessToken } from "./data/auth/authentication";

export async function middleware(request: NextRequest) {
  const access_Token = request.cookies.get("accessToken");
  const refresh_Token = request.cookies.get("refreshToken");

  if (!access_Token && refresh_Token) {
    return await refreshAccessToken();
  }
  if (!refresh_Token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
