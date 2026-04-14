import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminModel } from "@/lib/models/Admin";
import { getAdminPayloadFromRequest } from "@/lib/admin-auth";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const payload = await getAdminPayloadFromRequest(request);
    if (!payload || !payload.isSuperAdmin) return unauthorized();

    const { id } = await context.params;
    const body = await request.json();

    await connectToDatabase();
    const admin = await AdminModel.findById(id);
    if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });

    if (body.hasOwnProperty("isActive")) admin.isActive = Boolean(body.isActive);
    if (body.hasOwnProperty("isSuperAdmin")) admin.isSuperAdmin = Boolean(body.isSuperAdmin);

    await admin.save();

    return NextResponse.json({ admin: { _id: admin._id, email: admin.email, name: admin.name, isActive: admin.isActive, isSuperAdmin: admin.isSuperAdmin } });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update admin" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const payload = await getAdminPayloadFromRequest(request);
    if (!payload || !payload.isSuperAdmin) return unauthorized();

    const { id } = await context.params;
    
    // Prevent deleting oneself
    if (id === payload.id) {
      return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
    }

    await connectToDatabase();
    await AdminModel.findByIdAndDelete(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 });
  }
}
