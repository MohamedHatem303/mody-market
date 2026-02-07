import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { failedlogin, successlogin } from "./types/authInterface"

/* =========================
   Type Augmentation
========================= */
declare module "next-auth" {
  interface Session {
    user: any
    accessToken?: string
  }

  interface User {
    id: string
    userData?: any
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: any
    accessToken?: string
  }
}

/* =========================
   Auth Options
========================= */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const response = await fetch(
          `${process.env.Api}/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        )

        if (!response.ok) {
          return null
        }

        const payload: failedlogin | successlogin = await response.json()

        if ("token" in payload) {
          return {
            // 👈 لازم id حتى لو الباك مبيبعتهوش
            id: payload.user.email, // email = unique id

            accessToken: payload.token,
            userData: payload.user,
          }
        }

        return null
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.userData
        token.accessToken = user.accessToken
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      return session
    },
  },
}
