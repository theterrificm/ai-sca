import { NextAuthConfig } from "next-auth";

import type { NextRequest } from 'next/server';

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/start",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }: { auth: any; request: NextRequest }) {
      let isLoggedIn = !!auth?.user;
      let isOnChat = request.nextUrl.pathname.startsWith("/");
      let isOnRegister = request.nextUrl.pathname.startsWith("/register");
      let isOnLogin = request.nextUrl.pathname.startsWith("/login");

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL("/start", request.nextUrl));
      }

      if (isOnRegister || isOnLogin) {
        return true;
      }

      if (isOnChat) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL("/start", request.nextUrl));
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  }
} satisfies NextAuthConfig;