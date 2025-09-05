import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validators";
import { connectToDatabase } from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { signJwt, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { email, password } = adminLoginSchema.parse(body);
		await connectToDatabase();
		const user = await AdminUser.findOne({ email });
		if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		const ok = await verifyPassword(password, user.passwordHash);
		if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		const token = signJwt({ userId: String(user._id), role: "admin" });
		const res = NextResponse.json({ ok: true });
		res.cookies.set("auth_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
		return res;
	} catch (err: any) {
		return NextResponse.json({ error: err.message || "Invalid input" }, { status: 400 });
	}
}


