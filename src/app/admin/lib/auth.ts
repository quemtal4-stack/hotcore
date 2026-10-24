import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";

function parseAdminEmails() {
  const emails = process.env.ADMIN_EMAILS || "";
  return emails
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function verificarAdmin(next = "/admin") {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect(`/admin/login?next=${encodeURIComponent(next)}`);
  }

  const adminEmails = parseAdminEmails();
  const userEmail = data.user.email?.toLowerCase();

  if (adminEmails.length > 0 && !adminEmails.includes(userEmail || "")) {
    redirect("/admin/login?erro=nao-autorizado");
  }

  return {
    id: data.user.id,
    email: data.user.email,
    nome:
      data.user.user_metadata?.nome ||
      data.user.user_metadata?.full_name ||
      data.user.email?.split("@")[0],
    avatar_url: data.user.user_metadata?.avatar_url || null,
  };
}
