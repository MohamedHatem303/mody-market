import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

type ApiSuccess = { user: any; token: string };
type ApiFail = { message?: string };

type MyToken = JWT & {
  accessToken?: string;
  user?: any;
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        // parse body safely
        const payload: ApiSuccess | ApiFail = await res.json().catch(() => ({}));

        // if response not ok -> return null to indicate failure
        if (!res.ok) {
          // optionally: throw new Error((payload as ApiFail).message || "Login failed");
          return null;
        }

        // success shape expected: { user: {...}, token: "..." }
        if ((payload as ApiSuccess).token && (payload as ApiSuccess).user) {
          const success = payload as ApiSuccess;

          // Return a user object that will be available in jwt callback as `user`
          // include accessToken so we can persist it in the JWT
          return {
            id: success.user.email ?? success.user._id ?? "unknown",
            ...success.user,
            accessToken: success.token,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // called on sign in and every jwt update
    async jwt({ token, user }): Promise<MyToken> {
      const t = token as MyToken;
      if (user) {
        // `user` is the object we returned from authorize()
        t.user = user;
        // attach access token if present
        if ((user as any).accessToken) t.accessToken = (user as any).accessToken;
      }
      return t;
    },

    // called when `getSession()` or `useSession()` is called on the client
    async session({ session, token }) {
      const t = token as MyToken;
      // put the original user object (or a subset) on session.user
      if (t.user) session.user = t.user;
      // attach access token for client usage if needed
      (session as any).accessToken = t.accessToken;
      return session;
    },
  },
  // keep this set in env for production
  secret: process.env.NEXTAUTH_SECRET,
};

// Export default for the NextAuth route
export default NextAuth(authOptions);
