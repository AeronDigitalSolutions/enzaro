import mongoose from "mongoose";

export function getMongoUri() {
  const raw = process.env.MONGODB_URI;
  if (!raw) return "";
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function isMongoConfigured() {
  return Boolean(getMongoUri());
}

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
  const mongodbUri = getMongoUri();
  if (!mongodbUri) {
    throw new Error("Missing MONGODB_URI. Add it to your environment variables.");
  }

  const state = mongoose.connection.readyState;
  if (cached.conn && state === 1) return cached.conn;

  if (state === 0 || state === 3) {
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongodbUri, {
        dbName: process.env.MONGODB_DB || "enzaro",
        serverSelectionTimeoutMS: 8000,
        bufferCommands: false,
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
