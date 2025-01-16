import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      cinemaName: string | null;
      cinemaAddress: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
    cinemaName: string | null;
    cinemaAddress: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    cinemaName: string | null;
    cinemaAddress: string | null;
  }
}
