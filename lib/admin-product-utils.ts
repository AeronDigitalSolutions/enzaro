type ProductVariant = { sizeMl: number; price: number; mrp: number };

type ProductPayloadInput = {
  name?: string;
  slug?: string;
  inspiredBy?: string;
  category?: "him" | "her" | "unisex";
  productType?: "perfume" | "accessory";
  perfumeCategories?: string[];
  accessoryCategory?: string;
  sku?: string;
  stock?: number | string;
  image?: string;
  sizeImages?: { ml10?: string[]; ml50?: string[]; ml100?: string[] };
  gallery?: string[];
  description?: string;
  tags?: string[];
  reviewScore?: string;
  reviewCount?: number | string;
  couponText?: string;
  specs?: { label: string; value: string }[];
  notes?: { stage: string; value: string; symbol: string }[];
  accordion?: { title: string; content: string; open?: boolean }[];
  variants?: ProductVariant[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
};

export const DEFAULT_VARIANTS: ProductVariant[] = [
  { sizeMl: 80, price: 1249, mrp: 2500 },
  { sizeMl: 50, price: 849, mrp: 1700 },
  { sizeMl: 100, price: 1499, mrp: 3000 },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['".]/g, "")
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function boolFromUnknown(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  if (typeof value !== "string") return fallback;
  return ["1", "true", "yes", "y"].includes(value.toLowerCase().trim());
}

export function numberFromUnknown(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function cleanArray(values: unknown, fallback: string[] = []) {
  if (Array.isArray(values)) {
    const arr = values.map((item) => String(item).trim()).filter(Boolean);
    return arr.length ? arr : fallback;
  }
  return fallback;
}

export function buildProductPayload(input: ProductPayloadInput) {
  const safeName = String(input.name || "").trim();
  const safeSlug = slugify(String(input.slug || safeName));
  const variants = Array.isArray(input.variants) && input.variants.length ? input.variants : DEFAULT_VARIANTS;
  const preferred50 = variants.find((item) => Number(item.sizeMl) === 50) || DEFAULT_VARIANTS[1];

  const notes =
    Array.isArray(input.notes) && input.notes.length
      ? input.notes
      : [
          { stage: "Top Notes", value: "Bergamot", symbol: "TOP" },
          { stage: "Middle Notes", value: "Lavender", symbol: "MID" },
          { stage: "Base Notes", value: "Amberwood", symbol: "BAS" },
        ];

  const specs =
    Array.isArray(input.specs) && input.specs.length
      ? input.specs
      : [
          { label: "Concentration", value: "Eau de Parfum" },
          { label: "Longevity", value: "8-12 Hours" },
          { label: "Projection", value: "Moderate to Strong" },
          { label: "Occasion", value: "Daily / Evening" },
        ];

  const accordion =
    Array.isArray(input.accordion) && input.accordion.length
      ? input.accordion
      : [
          {
            title: "Feeling & Occasion",
            content: `${safeName || "This fragrance"} is crafted for confident day-to-evening wear.`,
            open: true,
          },
          {
            title: "Behind The Perfume",
            content: "Balanced with premium accords for projection, smoothness, and performance.",
          },
          {
            title: "How To Use",
            content: "Spray 3-5 times on pulse points and clothing from 6-8 inches.",
          },
        ];

  return {
    name: safeName,
    slug: safeSlug,
    inspiredBy: String(input.inspiredBy || "").trim(),
    category: (input.category || "unisex") as "him" | "her" | "unisex",
    productType: (input.productType || "perfume") as "perfume" | "accessory",
    perfumeCategories: cleanArray(input.perfumeCategories, []),
    accessoryCategory: String(input.accessoryCategory || "").trim(),
    sku: String(input.sku || "").trim(),
    stock: numberFromUnknown(input.stock, 0),
    subtitle: `${preferred50.sizeMl === 80 ? '4x20' : preferred50.sizeMl}ML`,
    price: numberFromUnknown(preferred50.price, 1699),
    mrp: numberFromUnknown(preferred50.mrp, 2600),
    image: String(input.image || "").trim(),
    sizeImages: {
      ml10: cleanArray(input.sizeImages?.ml10, []),
      ml50: cleanArray(input.sizeImages?.ml50, []),
      ml100: cleanArray(input.sizeImages?.ml100, []),
    },
    gallery: cleanArray(input.gallery, []),
    description: String(input.description || "").trim(),
    notes,
    tags: cleanArray(input.tags, []),
    reviewScore: String(input.reviewScore || "4.5"),
    reviewCount: numberFromUnknown(input.reviewCount, 0),
    couponText: String(input.couponText || "Unlock a special checkout price with code ENZARO10"),
    specs,
    accordion,
    variants,
    isBestSeller: boolFromUnknown(input.isBestSeller, false),
    isNewArrival: boolFromUnknown(input.isNewArrival, true),
  };
}
