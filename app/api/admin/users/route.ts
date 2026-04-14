import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminModel } from "@/lib/models/Admin";
import { getAdminPayloadFromRequest } from "@/lib/admin-auth";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getAdminPayloadFromRequest(request);
    if (!payload || !payload.isSuperAdmin) return unauthorized();

    await connectToDatabase();
    // Return all admins excluding passwords
    const admins = await AdminModel.find({}, "-passwordHash").sort({ createdAt: -1 }).lean();
    return NextResponse.json({ admins });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
