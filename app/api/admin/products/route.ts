import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/lib/models/Product";
import { buildProductPayload } from "@/lib/admin-product-utils";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!(await isAdminRequestAuthenticated(request))) return unauthorized();
  try {
    await connectToDatabase();
    const products = await ProductModel.find({}).sort({ displayId: 1 }).lean();
    return NextResponse.json({ products });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to fetch products: ${reason}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthenticated(request))) return unauthorized();
  try {
    await connectToDatabase();
    const body = await request.json();
    const payload = buildProductPayload(body || {});

    if (!payload.name || !payload.slug || !payload.image || !payload.description) {
      return NextResponse.json(
        { error: "Name, slug, image, and description are required." },
        { status: 400 }
      );
    }

    const exists = await ProductModel.findOne({ slug: payload.slug }).lean();
    if (exists) {
      return NextResponse.json({ error: "Slug already exists." }, { status: 409 });
    }

    const maxDisplay = await ProductModel.findOne({}).sort({ displayId: -1 }).lean();
    const displayId = String(Number(maxDisplay?.displayId || 0) + 1);

    const created = await ProductModel.create({
      ...payload,
      displayId,
    });

    return NextResponse.json({ product: created }, { status: 201 });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to create product: ${reason}` }, { status: 500 });
  }
}
