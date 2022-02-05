import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { ZERO_API_URL, ZERO_API_SECRET } from "utils/constants";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const authResponse = await fetch(`${ZERO_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await authResponse.json();

          if (data?.token) {
            const userResponse = await fetch(`${ZERO_API_URL}/me`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${data.token}`,
                "Content-Type": "application/json",
              },
            });

            const user = await userResponse.json();

            return {
              id: user.id,
              email: user.email,
              name: user.username,
              accessToken: data.token,
            };
          } else if (data.errors) {
            Promise.reject(data.errors[0]); // ??? how to propagate errors to client?
          }
        } catch (e) {
          // Promise.reject(new Error("There was an error with user authentication!"));
          throw new Error("There was an error with user authentication!");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, ...rest } = user;
        token.accessToken = accessToken;
        token.user = rest;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.user,
      };
      session.accessToken = token.accessToken;

      return session;
    },
  },
  session: {
    maxAge: 60 * 60,
  },
  secret: ZERO_API_SECRET,
});
