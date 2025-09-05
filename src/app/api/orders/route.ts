import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";
import Course from "@/models/Course";
import { orderCreateSchema } from "@/lib/validators";

export async function GET() {
	await connectToDatabase();
	const orders = await Order.find().sort({ createdAt: -1 }).lean();
	return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const input = orderCreateSchema.parse(body);
		await connectToDatabase();
		const course = await Course.findOne({ slug: input.courseSlug });
		if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });
		const created = await Order.create({
			userEmail: input.userEmail,
			userPhone: input.userPhone,
			courseId: course._id,
			courseTitleSnapshot: course.title,
			amountInRupees: input.amountInRupees,
			paymentProvider: input.paymentProvider,
			paymentStatus: input.paymentStatus,
			paymentMeta: input.paymentMeta,
			deliveredBy: input.deliveredBy,
		});
		return NextResponse.json(created, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}


