import { z } from "zod";

export const courseInputSchema = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	priceInRupees: z.union([z.literal(499), z.literal(999), z.literal(2999)]),
	thumbnailUrl: z.string().url().optional().or(z.literal("").transform(() => undefined)),
	content: z.object({
		pdfUrls: z.array(z.string().url()).default([]),
		audioUrls: z.array(z.string().url()).default([]),
		bonuses: z.array(z.string()).default([]),
	}),
	isLive: z.boolean().default(false),
});

export const adminLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const orderCreateSchema = z.object({
	userEmail: z.string().email(),
	userPhone: z.string().optional(),
	courseSlug: z.string().min(1),
	amountInRupees: z.number().int().positive(),
	paymentProvider: z.union([z.literal("razorpay"), z.literal("test")]).default("test"),
	paymentStatus: z.union([z.literal("created"), z.literal("paid"), z.literal("failed")]).default("created"),
	paymentMeta: z.record(z.any()).optional(),
	deliveredBy: z.union([z.literal("email"), z.literal("whatsapp"), z.literal("manual")]).default("manual"),
});

export type CourseInput = z.infer<typeof courseInputSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type OrderCreateInput = z.infer<typeof orderCreateSchema>;


