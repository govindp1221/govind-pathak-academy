import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";
import { courseInputSchema } from "@/lib/validators";
import { verifyJwt } from "@/lib/auth";

export async function GET() {
	await connectToDatabase();
	const courses = await Course.find().lean();
	return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
	const auth = req.headers.get("authorization");
	const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
	if (!token || !verifyJwt(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	try {
		const body = await req.json();
		const input = courseInputSchema.parse(body);
		await connectToDatabase();
		const created = await Course.create(input);
		return NextResponse.json(created, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}


