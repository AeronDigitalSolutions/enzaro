import { Schema, model, models, type Model } from "mongoose";

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    isSuperAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type AdminDocument = {
  _id: string;
  email: string;
  passwordHash: string;
  name: string;
  isActive: boolean;
  isSuperAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

if (process.env.NODE_ENV !== "production") {
  delete models.Admin;
}

export const AdminModel = (models.Admin as Model<AdminDocument>) || model<AdminDocument>("Admin", AdminSchema);
