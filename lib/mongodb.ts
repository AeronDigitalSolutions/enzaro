import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
export const isMongoConfigured = Boolean(MONGODB_URI);

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI. Add it to your environment variables.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB || "enzaro",
        serverSelectionTimeoutMS: 8000,
      })
      .catch((error) => {
        cached.promise = null;
        cached.conn = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached;
  return cached.conn;
}
