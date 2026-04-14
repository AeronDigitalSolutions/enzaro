import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminCookieStoreAuthenticated, getAdminPayloadFromCookieStore } from "@/lib/admin-auth";
import UsersPanelClient from "./UsersPanelClient";

export const metadata: Metadata = {
  title: "Admin Users",
};

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const payload = await getAdminPayloadFromCookieStore(cookieStore);
  
  if (!payload) {
    redirect("/admin/login");
  }

  if (!payload.isSuperAdmin) {
    redirect("/admin"); // Redirect non-super-admins back to the main dashboard
  }

  return <UsersPanelClient currentAdminId={payload.id} />;
}
