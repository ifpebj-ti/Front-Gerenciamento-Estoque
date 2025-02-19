import { verifyToken } from "@/API/verifyToken";
import { UserInfoType } from "@/types/userType";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  token: string;
  username: string;
  email: string;
  status: boolean;
  first_acess: boolean;
  roles: { id: string; authority: string }[];
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
  status: boolean;
  first_acess: boolean;
  roles: { id: string; authority: string }[];
}

let userInfo: UserInfo;

function encodeBase64(value: string): string {
  return Buffer.from(value).toString("base64");
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

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/oauth2/token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${basicAuth}`,
              },
              body: body.toString(),
            }
          );

          if (!response.ok) {
            console.error(
              "Falha na autenticação:",
              response.status,
              await response.text()
            );
            return null;
          }

          const data = await response.json();

          const requestVerify = await verifyToken({ token: data.access_token });
          if (requestVerify) {
            userInfo = requestVerify.data;
          }

          // Retorna o usuário sem a propriedade `photo`
          return {
            id: `${userInfo.id}`,
            token: data.access_token,
            username: userInfo.name,
            email: userInfo.email,
            status: userInfo.status,
            roles: userInfo.roles,
            first_acess: userInfo.first_acess,
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
      if (user) {
        const customUser = user as User;
        token.accessToken = customUser.token;
        token.username = customUser.username;
        token.id = customUser.id;
        token.userInfo = {
          id: customUser.id,
          name: customUser.username,
          email: customUser.email,
          status: customUser.status,
          roles: customUser.roles,
          first_acess: customUser.first_acess,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.userInfo = token.userInfo as UserInfoType;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
