import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/services/products";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const product = await getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (_error) {
    return NextResponse.json({ error: "Failed to fetch product." }, { status: 500 });
  }
}

