import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { failedlogin, successlogin } from "./types/authInterface";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload: failedlogin | successlogin = await res.json();

        if ("token" in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.token;
      }
      return token;
    },

    session({ session, token }) {
      session.user = token.user as any;
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};
