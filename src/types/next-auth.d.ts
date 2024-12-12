/* eslint-disable */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Declara a nova propriedade no tipo Session
  }

  interface JWT {
    accessToken?: string; // Declara a nova propriedade no token JWT
  }
}
