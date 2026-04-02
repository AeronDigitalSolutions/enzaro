import { Schema, model, models, type Model } from "mongoose";

const ContactInquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    topic: { type: String, default: "general" },
    orderId: { type: String, default: "" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export type ContactInquiryDocument = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  orderId: string;
  message: string;
};

export const ContactInquiryModel =
  (models.ContactInquiry as Model<ContactInquiryDocument>) ||
  model<ContactInquiryDocument>("ContactInquiry", ContactInquirySchema);

