/* eslint-disable */
import NextAuth from "next-auth";
import { UserInfoType } from "./userType";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Declara a nova propriedade no tipo Session
    userInfo: UserInfoType;
  }

  interface JWT {
    accessToken?: string; // Declara a nova propriedade no token JWT
    userInfo: UserInfoType;
  }
}
