import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "enzaro_admin_session";
const JWT_SECRET_KEYS = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_enzaro_secret_key_change_me_in_prod");

export type AdminTokenPayload = {
  id: string;
  email: string;
  isSuperAdmin: boolean;
};

export async function createAdminToken(payload: AdminTokenPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET_KEYS);
  return token;
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEYS);
    return payload as AdminTokenPayload;
  } catch (error) {
    return null;
  }
}

export async function getAdminPayloadFromRequest(request: NextRequest): Promise<AdminTokenPayload | null> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function getAdminPayloadFromCookieStore(cookies: { get: (name: string) => { value?: string } | undefined }): Promise<AdminTokenPayload | null> {
  const token = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function isAdminRequestAuthenticated(request: NextRequest) {
  const payload = await getAdminPayloadFromRequest(request);
  return payload !== null;
}

export async function isAdminCookieStoreAuthenticated(cookies: { get: (name: string) => { value?: string } | undefined }) {
  const payload = await getAdminPayloadFromCookieStore(cookies);
  return payload !== null;
}
