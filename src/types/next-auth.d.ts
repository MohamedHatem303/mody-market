import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession, User } from "next-auth";
import { UserResponse } from "./authInterface";

declare module "next-auth" {
  interface User {
    user: UserResponse;
    token: string;
  }
  interface Session {
    user: UserResponse;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}
