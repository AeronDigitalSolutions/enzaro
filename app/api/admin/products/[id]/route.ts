import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/lib/models/Product";
import { buildProductPayload } from "@/lib/admin-product-utils";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthenticated(request))) return unauthorized();
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const existing = await ProductModel.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await request.json();
    const payload = buildProductPayload({ ...existing.toObject(), ...(body || {}) });

    existing.set(payload);
    await existing.save();

    return NextResponse.json({ product: existing });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to update product: ${reason}` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthenticated(request))) return unauthorized();
  try {
    await connectToDatabase();
    const { id } = await context.params;
    await ProductModel.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to delete product: ${reason}` }, { status: 500 });
  }
}
