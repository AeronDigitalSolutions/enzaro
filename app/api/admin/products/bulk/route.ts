import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/lib/models/Product";
import { buildProductPayload, boolFromUnknown, numberFromUnknown } from "@/lib/admin-product-utils";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequestAuthenticated(request))) return unauthorized();

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Please upload a file." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    if (!firstSheet) {
      return NextResponse.json({ error: "File is empty." }, { status: 400 });
    }

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, { defval: "" });
    if (!rows.length) {
      return NextResponse.json({ error: "No data rows found." }, { status: 400 });
    }

    await connectToDatabase();

    let updated = 0;
    let created = 0;
    const logs: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowIndex = i + 2; // Assuming header in row 1
      const tagsRaw = String(row.tags || row.Tags || "");
      const galleryRaw = String(row.gallery || row.Gallery || "");

      const payload = buildProductPayload({
        name: String(row.name || row.Name || ""),
        slug: String(row.slug || row.Slug || ""),
        inspiredBy: String(row.inspiredBy || row.InspiredBy || row["Inspired By"] || ""),
        category: (String(row.category || row.Category || "unisex").toLowerCase() as "him" | "her" | "unisex"),
        productType: (String(row.productType || row.ProductType || "perfume").toLowerCase() as "perfume" | "accessory"),
        perfumeCategories: String(row.perfumeCategories || row.PerfumeCategories || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        accessoryCategory: String(row.accessoryCategory || row.AccessoryCategory || ""),
        image: String(row.image || row.Image || ""),
        sizeImages: {
          ml10: String(row.image10 || row.image80 || row.Image10 || row.Image80 || "").trim() ? [String(row.image10 || row.image80 || row.Image10 || row.Image80 || "").trim()] : [],
          ml50: String(row.image50 || row.Image50 || "").trim() ? [String(row.image50 || row.Image50 || "").trim()] : [],
          ml100: String(row.image100 || row.Image100 || "").trim() ? [String(row.image100 || row.Image100 || "").trim()] : [],
        },
        description: String(row.description || row.Description || ""),
        tags: tagsRaw
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        gallery: galleryRaw
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        sku: String(row.sku || row.SKU || ""),
        stock: numberFromUnknown(row.stock || row.Stock, 0),
        reviewScore: String(row.reviewScore || row.ReviewScore || "4.5"),
        reviewCount: numberFromUnknown(row.reviewCount || row.ReviewCount, 0),
        couponText: String(row.couponText || row.CouponText || "Unlock a special checkout price with code ENZARO10"),
        variants: [
          {
            sizeMl: 80,
            price: numberFromUnknown(row.price10 || row.price80 || row.Price80 || row.Price10, 1249),
            mrp: numberFromUnknown(row.mrp10 || row.mrp80 || row.Mrp80 || row.Mrp10, 2500),
          },
          {
            sizeMl: 50,
            price: numberFromUnknown(row.price50 || row.Price50, 849),
            mrp: numberFromUnknown(row.mrp50 || row.Mrp50, 1700),
          },
          {
            sizeMl: 100,
            price: numberFromUnknown(row.price100 || row.Price100, 1499),
            mrp: numberFromUnknown(row.mrp100 || row.Mrp100, 3000),
          },
        ],
        isBestSeller: boolFromUnknown(row.isBestSeller || row.IsBestSeller, false),
        isNewArrival: boolFromUnknown(row.isNewArrival || row.IsNewArrival, true),
      });

      if (!payload.name || !payload.slug) {
        const missing = [];
        if (!payload.name) missing.push("name");
        if (!payload.slug) missing.push("slug");
        const nameDesc = payload.name || "Unknown Product";
        logs.push(`Row ${rowIndex} skipped (${nameDesc}): Missing required fields: ${missing.join(", ")}`);
        continue;
      }

      try {
        const existing = await ProductModel.findOne({ slug: payload.slug }).lean();
        if (existing) {
          await ProductModel.updateOne({ slug: payload.slug }, { $set: payload });
          updated += 1;
        } else {
          // Fetch max DisplayId, taking into account it could be numeric representation
          const allProducts = await ProductModel.find({}, { displayId: 1 }).lean();
          let maxDisplayIdNum = 0;
          for (const p of allProducts) {
            const num = parseInt(p.displayId || "0", 10);
            if (!isNaN(num) && num > maxDisplayIdNum) {
              maxDisplayIdNum = num;
            }
          }
          const displayId = String(maxDisplayIdNum + 1);
          await ProductModel.create({ ...payload, displayId });
          created += 1;
        }
      } catch (rowErr) {
        const errMessage = rowErr instanceof Error ? rowErr.message : "Unknown error";
        logs.push(`Row ${rowIndex} failed (${payload.name}): ${errMessage}`);
      }
    }

    return NextResponse.json({ ok: true, created, updated, totalRows: rows.length, logs });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed bulk upload: ${reason}` }, { status: 500 });
  }
}

