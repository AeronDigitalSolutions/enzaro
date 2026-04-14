import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, getAdminPayloadFromCookieStore } from "@/lib/admin-auth";
import AdminPanelClient from "./AdminPanelClient";

export const metadata: Metadata = {
  title: "Inventory Panel",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const payload = await getAdminPayloadFromCookieStore(cookieStore);
  if (!payload) {
    redirect("/admin/login");
  }

  return <AdminPanelClient adminCookieName={ADMIN_SESSION_COOKIE} isSuperAdmin={payload.isSuperAdmin} />;
}
