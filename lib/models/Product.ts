import { Schema, model, models, type Model } from "mongoose";

const ProductNoteSchema = new Schema(
  {
    stage: { type: String, required: true },
    value: { type: String, required: true },
    symbol: { type: String, required: true },
  },
  { _id: false }
);

const ProductSpecSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const ProductAccordionSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    open: { type: Boolean, default: false },
  },
  { _id: false }
);

const ProductVariantSchema = new Schema(
  {
    sizeMl: { type: Number, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    displayId: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    description: { type: String, required: true },
    notes: { type: [ProductNoteSchema], default: [] },
    tags: { type: [String], default: [] },
    reviewScore: { type: String, required: true },
    reviewCount: { type: Number, required: true },
    couponText: { type: String, required: true },
    specs: { type: [ProductSpecSchema], default: [] },
    accordion: { type: [ProductAccordionSchema], default: [] },
    variants: { type: [ProductVariantSchema], default: [] },
    isBestSeller: { type: Boolean, default: false, index: true },
    isNewArrival: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export type ProductDocument = {
  _id: string;
  displayId: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  mrp: number;
  image: string;
  gallery: string[];
  description: string;
  notes: { stage: string; value: string; symbol: string }[];
  tags: string[];
  reviewScore: string;
  reviewCount: number;
  couponText: string;
  specs: { label: string; value: string }[];
  accordion: { title: string; content: string; open?: boolean }[];
  variants: { sizeMl: number; price: number; mrp: number }[];
  isBestSeller: boolean;
  isNewArrival: boolean;
};

export const ProductModel = (models.Product as Model<ProductDocument>) || model<ProductDocument>("Product", ProductSchema);
