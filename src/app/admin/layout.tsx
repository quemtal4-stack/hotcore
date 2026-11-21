import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { parseAdminEmails } from "./lib/auth";

const PUBLIC_ADMIN_ROUTES = [
  "/admin/login",
  "/admin/resetar-senha",
  "/admin/resetar-senha/atualizar",
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  // Se não estiver logado, manda para login
  if (!data.user) {
    redirect("/admin/login");
  }

  // Se estiver logado mas não for admin, manda para login com erro
  const adminEmails = parseAdminEmails();
  const userEmail = data.user.email?.toLowerCase() || "";

  if (adminEmails.length > 0 && !adminEmails.includes(userEmail)) {
    redirect("/admin/login?erro=nao-autorizado");
  }

  return <>{children}</>;
}
