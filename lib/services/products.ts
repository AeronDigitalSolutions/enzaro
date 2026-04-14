import { cache } from "react";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { allSeedProducts } from "@/lib/default-products";
import { ProductModel } from "@/lib/models/Product";

const STANDARD_VARIANTS = [
  { sizeMl: 80, price: 1249, mrp: 2500 },
  { sizeMl: 50, price: 849, mrp: 1700 },
  { sizeMl: 100, price: 1499, mrp: 3000 },
];

function normalizePricing(product: any) {
  const variants = Array.isArray(product.variants) && product.variants.length > 0 ? product.variants : STANDARD_VARIANTS;
  const preferred50 = variants.find((v: any) => Number(v.sizeMl) === 50) || STANDARD_VARIANTS[1];
  const subtitle = `${preferred50.sizeMl === 80 ? '4x20' : preferred50.sizeMl}ML`;

  return {
    ...product,
    variants,
    subtitle,
    price: preferred50.price,
    mrp: preferred50.mrp,
  };
}

function toPlainProduct(product: any) {
  const _id = product._id?.toString?.() ?? product._id;
  const normalized = normalizePricing(product);
  return {
    ...normalized,
    _id,
    id: _id,
  };
}

function getFallbackProducts() {
  return allSeedProducts.map((p) => ({
    ...normalizePricing(p),
    _id: p.displayId,
    id: p.displayId,
  }));
}

export const ensureProductsSeeded = cache(async () => {
  if (!isMongoConfigured()) return;
  await connectToDatabase();
  await ProductModel.bulkWrite(
    allSeedProducts.map((product) => ({
      updateOne: {
        filter: { slug: product.slug },
        update: { $set: product },
        upsert: true,
      },
    }))
  );
});

export async function getAllProducts() {
  if (!isMongoConfigured()) return getFallbackProducts();
  try {
    await ensureProductsSeeded();
    const products = await ProductModel.find({}).sort({ displayId: 1 }).lean();
    return products.map(toPlainProduct);
  } catch (_error) {
    return getFallbackProducts();
  }
}

export async function getProductBySlug(slug: string) {
  if (!isMongoConfigured()) {
    const fallback = getFallbackProducts();
    return fallback.find((p) => p.slug === slug) || fallback[0] || null;
  }
  try {
    await ensureProductsSeeded();
    const product = await ProductModel.findOne({ slug }).lean();
    if (product) return toPlainProduct(product);

    const first = await ProductModel.findOne({}).sort({ displayId: 1 }).lean();
    return first ? toPlainProduct(first) : null;
  } catch (_error) {
    const fallback = getFallbackProducts();
    return fallback.find((p) => p.slug === slug) || fallback[0] || null;
  }
}

export async function getHomeCollections() {
  const allProducts = await getAllProducts();
  const perfumes = allProducts.filter((p) => (p.productType || "perfume") === "perfume");
  const bestSellers = perfumes.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = perfumes.filter((p) => p.isNewArrival).slice(0, 4);
  return { bestSellers, newArrivals };
}

export async function getAccessories() {
  const allProducts = await getAllProducts();
  return allProducts.filter((p) => (p.productType || "perfume") === "accessory");
}
