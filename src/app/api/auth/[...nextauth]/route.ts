import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

interface User {
  id: string;
  token: string;
  username: string;
}

function encodeBase64(value: string): string {
  return Buffer.from(value).toString("base64");
}

interface User {
  id: string;
  token: string;
  username: string;
}

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials || !credentials.username || !credentials.password) {
          console.error("Credenciais ausentes.");
          return null;
        }

        try {
          const clientId = "myclientid";
          const clientSecret = "myclientsecret";
          const basicAuth = encodeBase64(`${clientId}:${clientSecret}`);

          const body = new URLSearchParams();
          body.append("username", credentials.username);
          body.append("password", credentials.password);
          body.append("grant_type", "password");

          const response = await fetch("http://localhost:8080/oauth2/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${basicAuth}`,
            },
            body: body.toString(),
          });

          if (!response.ok) {
            console.error(
              "Falha na autenticação:",
              response.status,
              await response.text()
            );
            return null;
          }

          const data = await response.json();

          // Salva o token JWT em cookies
          cookies().set("jwt", data.access_token);

          // Retorna o usuário com o token
          return {
            id: "unique-user-id", // Substitua por um ID real, se disponível
            token: data.access_token,
            username: credentials.username,
          };
        } catch (e) {
          console.error("Erro na autenticação:", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Salva o token JWT no callback do JWT
      if (user) {
        token.accessToken = (user as User).token;
        token.username = (user as User).username; // Opcional: salvar o nome de usuário
      }
      return token;
    },
    async session({ session, token }) {
      // Adiciona o token à sessão
      session.accessToken = token.accessToken as string;
      //   session.username = token.username as string; // Opcional: incluir o nome de usuário
      return session;
    },
  },
});

export { handler as GET, handler as POST };
