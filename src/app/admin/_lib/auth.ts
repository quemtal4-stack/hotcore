import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verificarAdmin(next = "/admin") {
  const adminSecret = process.env.ADMIN_SESSION_SECRET;
  const cookieStore = await cookies();

  const session = cookieStore.get("admin_session")?.value;

  if (!adminSecret || session !== adminSecret) {
    redirect(`/admin/login?next=${encodeURIComponent(next)}`);
  }
}
