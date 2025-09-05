import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth";

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
		const token = req.cookies.get("auth_token")?.value;
		if (!token || !verifyJwt(token)) {
			const url = new URL("/admin/login", req.url);
			return NextResponse.redirect(url);
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};


