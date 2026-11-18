import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { LoginForm } from "./LoginForm";

function parseAdminEmails() {
  const emails = process.env.ADMIN_EMAILS || "";
  return emails
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    const adminEmails = parseAdminEmails();
    const userEmail = data.user.email?.toLowerCase();

    if (adminEmails.length > 0 && !adminEmails.includes(userEmail || "")) {
      redirect("/admin/login?erro=nao-autorizado");
    }

    redirect("/admin/painel");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8E7] p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-red-700">
          Área Restrita
        </p>

        <h1 className="mt-4 text-center text-3xl font-black text-gray-950">
          Login do Admin
        </h1>

        <p className="mt-3 text-center text-sm font-bold text-gray-600">
          Acesse com seu e-mail autorizado.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
