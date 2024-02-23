import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      express_token: string;
      role: string;
      id: string;
    } & DefaultSession["user"];
  }

  // interface of user object returned by the backend
  interface User extends DefaultUser {
    token: string;
    email: string;
    name: string;
    role: string;
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    express_token: string;
    email: string;
    name: string;
    room_token?: string;
    id: string;
  }
}
