import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

import { getServerSession } from "next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/register",
    newUser: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log("cred = ", credentials);
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }
          const response = await axios.post(
            "http://localhost:8000/api/users/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          console.log("login data = ", response.data);
          return response.data;
        } catch (err: any) {
          console.log("LOGIN ERROR", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      // this token will then be stored in cookes and passed to the session callback
      // console.log("user incoming =>", user);
      console.log("jwt called", user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.express_token = user.token;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("session called");
      if (token) {
        session.user.express_token = token.express_token;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

// Use it in server contexts
function serverAuth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export default serverAuth;
