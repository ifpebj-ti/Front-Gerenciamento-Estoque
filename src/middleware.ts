import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { verifyToken } from "./API/verifyToken";

export default withAuth(
  async function middleware(req) {
    // Obtenha o token do NextAuth
    const token = req.nextauth.token;

    // Se o token não existir, redirecione para a página de login
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Verificando o token
    const verify = await verifyToken({ token: token.accessToken as string });

    // Caso o token não seja válido, redirecione para a página de login
    if (!verify || verify.status !== 200) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Permita o acesso se o token for válido
    return NextResponse.next();
  },
  {
    // Configurações de rotas protegidas
    pages: {
      signIn: "/login", // Página de login
    },
  }
);

// Configura quais rotas o middleware deve proteger
export const config = {
  matcher: ["/", "/stock", "/admin", "/profile", "/logout"], // Rotas protegidas
};
