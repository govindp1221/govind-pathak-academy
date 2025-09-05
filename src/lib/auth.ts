import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export type JwtPayload = {
	userId: string;
	role: "admin";
};

export function signJwt(payload: JwtPayload): string {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is not set in environment variables");
	}
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJwt(token: string): JwtPayload | null {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is not set in environment variables");
	}
	try {
		return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
	} catch {
		return null;
	}
}

export async function hashPassword(plain: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(plain, salt);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
	return bcrypt.compare(plain, hash);
}


