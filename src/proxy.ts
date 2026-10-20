// src/proxy.ts

import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    return new NextResponse("Admin não configurado.", {
      status: 500,
    });
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new NextResponse("Autenticação necessária.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Área Administrativa"',
      },
    });
  }

  const [type, credentials] = authHeader.split(" ");

  if (type !== "Basic" || !credentials) {
    return new NextResponse("Autenticação inválida.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Área Administrativa"',
      },
    });
  }

  let decoded = "";

  try {
    decoded = atob(credentials);
  } catch {
    return new NextResponse("Credenciais inválidas.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Área Administrativa"',
      },
    });
  }

  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex === -1) {
    return new NextResponse("Credenciais inválidas.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Área Administrativa"',
      },
    });
  }

  const user = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  if (user !== adminUser || password !== adminPassword) {
    return new NextResponse("Usuário ou senha inválidos.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Área Administrativa"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
