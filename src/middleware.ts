import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { verifyToken } from "./API/verifyToken";
import { UserInfoType } from "./types/userType";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;

    // Se o token não existir, redirecione para a página de login
    if (!token || !token.accessToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Verifique o token na API
    const verify = await verifyToken({ token: token.accessToken as string });

    // Caso o token seja inválido ou expirado, redirecione para login
    if (!verify || verify.status !== 200) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Use o userInfo armazenado no token
    const userInfo: UserInfoType = token.userInfo as UserInfoType;

    // Verifique se a rota atual é `/admin` e a role do usuário
    if (req.nextUrl.pathname.startsWith("/admin") && userInfo) {
      let isAdmin;
      if (userInfo.roles) {
        isAdmin = userInfo.roles.some(
          (role) => role.authority === "ROLE_ADMIN"
        );
      }

      if (!isAdmin) {
        const url = req.nextUrl.clone();
        url.pathname = "/unauthorized"; // Página de erro de acesso negado
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
      signOut: "/login",
    },
  }
);

export const config = {
  matcher: ["/", "/stock", "/admin", "/profile", "/logout"], // Rotas protegidas
};
