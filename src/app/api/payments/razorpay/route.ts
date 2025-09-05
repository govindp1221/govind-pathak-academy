import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
	if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
		return NextResponse.json({ error: "Razorpay not configured" }, { status: 500 });
	}
	const body = await req.json();
	const { amountInRupees, receipt } = body as { amountInRupees: number; receipt?: string };
	const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! });
	const order = await instance.orders.create({ amount: amountInRupees * 100, currency: "INR", receipt: receipt || "rcptid_11" });
	return NextResponse.json(order);
}


