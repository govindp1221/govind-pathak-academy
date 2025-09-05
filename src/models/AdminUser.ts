import { Schema, model, models } from "mongoose";

export interface AdminUserDocument {
	_id: Schema.Types.ObjectId;
	email: string;
	passwordHash: string;
	role: "admin";
	createdAt: Date;
	updatedAt: Date;
}

const AdminUserSchema = new Schema<AdminUserDocument>(
	{
		email: { type: String, required: true, unique: true, index: true },
		passwordHash: { type: String, required: true },
		role: { type: String, enum: ["admin"], default: "admin" },
	},
	{ timestamps: true }
);

export const AdminUser = models.AdminUser || model<AdminUserDocument>("AdminUser", AdminUserSchema);

export default AdminUser;


