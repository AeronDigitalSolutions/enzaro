import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminModel } from "@/lib/models/Admin";
import bcrypt from "bcryptjs";
import { createAdminToken, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim();
    const password = String(body?.password || "").trim();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    await connectToDatabase();
    
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    if (!admin.isActive) {
      return NextResponse.json({ error: "Account pending verification by Super Admin." }, { status: 403 });
    }

    const payload = {
      id: String(admin._id),
      email: admin.email,
      isSuperAdmin: admin.isSuperAdmin,
    };

    const token = await createAdminToken(payload);
    const response = NextResponse.json({ ok: true });
    
    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
    
    return response;
  } catch (_error) {
    return NextResponse.json({ error: "Failed to login." }, { status: 500 });
  }
}
