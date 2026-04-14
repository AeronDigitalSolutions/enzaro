import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Admin Registration",
};

export default function AdminRegisterPage() {
  return <RegisterClient />;
}
