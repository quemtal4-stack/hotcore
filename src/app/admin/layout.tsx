import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";

function parseAdminEmails(): string[] {
  const emails = process.env.ADMIN_EMAILS || "";
  return emails
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

const PUBLIC_ADMIN_ROUTES = [
  "/admin/login",
  "/admin/resetar-senha",
  "/admin/resetar-senha/atualizar",
];

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ slug?: string[] }>;
}) {
  const pathname =
    typeof window === "undefined"
      ? `/admin/${(await params)?.slug?.join("/") || ""}`
      : window.location.pathname;

  const isPublicRoute = PUBLIC_ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isPublicRoute) {
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
  }

  return <>{children}</>;
}
