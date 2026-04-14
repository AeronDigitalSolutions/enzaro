import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminModel } from "@/lib/models/Admin";
import bcrypt from "bcryptjs";
import { createAdminToken, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await AdminModel.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "An admin with this email already exists." }, { status: 409 });
    }

    const adminCount = await AdminModel.countDocuments();
    // First admin is automatically a super admin and verified
    const isFirstAdmin = adminCount === 0;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await AdminModel.create({
      name,
      email,
      passwordHash,
      isActive: isFirstAdmin,
      isSuperAdmin: isFirstAdmin,
    });

    if (isFirstAdmin) {
      const payload = {
        id: String(newAdmin._id),
        email: newAdmin.email,
        isSuperAdmin: newAdmin.isSuperAdmin,
      };

      const token = await createAdminToken(payload);
      const response = NextResponse.json({ ok: true, pending: false });
      
      response.cookies.set(ADMIN_SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } else {
      return NextResponse.json({ ok: true, pending: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to register. Please try again." }, { status: 500 });
  }
}
