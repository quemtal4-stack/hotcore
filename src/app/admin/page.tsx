import { redirect } from "next/navigation";
import { verificarAdmin } from "./_lib/auth";

export default async function AdminPage() {
  await verificarAdmin("/admin");

  redirect("/admin/painel");
}
