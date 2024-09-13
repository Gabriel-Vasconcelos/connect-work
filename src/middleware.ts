import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const url = request.nextUrl.clone();

  // Definindo rotas privadas e para usuários não autenticados
  const privatePaths = ["/feed", "/myservices/new", "/myservices/edit", "/profile" ];
  const unauthenticatedPaths = ["/login", "/register"];

  if (privatePaths.some(path => url.pathname.startsWith(path))) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (unauthenticatedPaths.some(path => url.pathname.startsWith(path)) || url.pathname === '/') {
    if (token) {
      url.pathname = "/feed"; // "Página inicial" para usuários autenticados
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/:path*" // Aplica a todas as rotas
};
