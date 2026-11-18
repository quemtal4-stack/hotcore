import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";

function parseAdminEmails(): string[] {
  const emails = process.env.ADMIN_EMAILS || "";
  return emails
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/admin/login");
  }

  const adminEmails = parseAdminEmails();
  const userEmail = data.user.email?.toLowerCase() || "";

  if (adminEmails.length > 0 && !adminEmails.includes(userEmail)) {
    redirect("/admin/login?erro=nao-autorizado");
  }

  return <>{children}</>;
}
