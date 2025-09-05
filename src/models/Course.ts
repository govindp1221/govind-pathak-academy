import { Schema, model, models } from "mongoose";

export type CourseContent = {
	pdfUrls: string[];
	audioUrls: string[];
	bonuses: string[];
};

export interface CourseDocument {
	_id: Schema.Types.ObjectId;
	slug: string;
	title: string;
	description: string;
	priceInRupees: number;
	thumbnailUrl?: string;
	content: CourseContent;
	isLive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const CourseSchema = new Schema<CourseDocument>(
	{
		slug: { type: String, required: true, unique: true, index: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		priceInRupees: { type: Number, required: true, enum: [499, 999, 2999] },
		thumbnailUrl: { type: String },
		content: {
			pdfUrls: { type: [String], default: [] },
			audioUrls: { type: [String], default: [] },
			bonuses: { type: [String], default: [] },
		},
		isLive: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const Course = models.Course || model<CourseDocument>("Course", CourseSchema);

export default Course;


