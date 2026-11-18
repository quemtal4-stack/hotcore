import { headers } from "next/headers";
import { verificarAdmin } from "./lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";

  const publicRoutes = ["/admin/login", "/admin/resetar-senha"];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isPublicRoute) {
    await verificarAdmin(pathname || "/admin");
  }

  return <>{children}</>;
}
