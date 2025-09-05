import mongoose from "mongoose";

// Maintain a single cached connection across hot reloads in development
// to prevent creating multiple connections.
type MongooseCache = {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
};

declare global {
	// eslint-disable-next-line no-var
	var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

export async function connectToDatabase(): Promise<typeof mongoose> {
	if (cached.conn) return cached.conn;

	if (!process.env.MONGODB_URI) {
		throw new Error("MONGODB_URI is not set in environment variables");
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(process.env.MONGODB_URI, {
			dbName: process.env.MONGODB_DB_NAME || undefined,
		}) as unknown as Promise<typeof mongoose>;
	}

	cached.conn = await cached.promise;
	global.mongooseCache = cached;
	return cached.conn;
}

export default connectToDatabase;


