import { Schema, model, models } from "mongoose";

export interface OrderDocument {
	_id: Schema.Types.ObjectId;
	userEmail: string;
	userPhone?: string;
	courseId: Schema.Types.ObjectId;
	courseTitleSnapshot: string;
	amountInRupees: number;
	paymentProvider: "razorpay" | "test";
	paymentStatus: "created" | "paid" | "failed" | "refunded";
	paymentMeta?: Record<string, unknown>;
	deliveredBy: "email" | "whatsapp" | "manual";
	deliveredAt?: Date;
	createdAt: Date;
	updatedAt: Date;
}

const OrderSchema = new Schema<OrderDocument>(
	{
		userEmail: { type: String, required: true, index: true },
		userPhone: { type: String },
		courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true, index: true },
		courseTitleSnapshot: { type: String, required: true },
		amountInRupees: { type: Number, required: true },
		paymentProvider: { type: String, enum: ["razorpay", "test"], default: "test" },
		paymentStatus: { type: String, enum: ["created", "paid", "failed", "refunded"], default: "created" },
		paymentMeta: { type: Schema.Types.Mixed },
		deliveredBy: { type: String, enum: ["email", "whatsapp", "manual"], default: "manual" },
		deliveredAt: { type: Date },
	},
	{ timestamps: true }
);

export const Order = models.Order || model<OrderDocument>("Order", OrderSchema);

export default Order;


