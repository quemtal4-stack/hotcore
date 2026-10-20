import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();

  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminPassword || !adminSecret) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("erro", "config");

    return NextResponse.redirect(url);
  }

  if (password !== adminPassword) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("erro", "1");
    url.searchParams.set("next", next);

    return NextResponse.redirect(url);
  }

  const url = new URL(next, request.url);
  const response = NextResponse.redirect(url);

  response.cookies.set("admin_session", adminSecret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
