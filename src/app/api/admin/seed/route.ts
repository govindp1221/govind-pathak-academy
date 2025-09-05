import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import { hashPassword } from "@/lib/auth";

// POST /api/admin/seed  { secret, email, password }
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		if (!process.env.SEED_SECRET || body.secret !== process.env.SEED_SECRET) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		const { email, password } = body as { email: string; password: string };
		if (!email || !password) return NextResponse.json({ error: "email/password required" }, { status: 400 });
		await connectToDatabase();
		const exists = await AdminUser.findOne({ email });
		if (exists) return NextResponse.json({ ok: true, message: "Already exists" });
		await AdminUser.create({ email, passwordHash: await hashPassword(password) });
		return NextResponse.json({ ok: true });
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}


