import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

declare module "next-auth" {
  interface Session {
    jwt: string;
  }

  interface User {
    id: string;
    email: string;
    token: string;
  }
}
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received in authorize:", credentials);
      
        if (!credentials?.email || !credentials?.password) {
          console.error("❌ Missing credentials");
          throw new Error("Missing credentials");
        }
      
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
            email: credentials.email,
            password: credentials.password,
          });
      
          const user = response.data;
          console.log("Backend response:", user);
      
          if (user?.token) {
            return { id: user.id, email: user.email, token: user.token };
          }
      
          console.error("❌ Invalid credentials: No token returned");
          throw new Error("Invalid credentials");
        } catch (error: any) {
          console.error("Login error:", error.response?.data || error.message);
          throw new Error(error.response?.data?.error || "Login failed");
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token.jwt as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login", // Redirect to the login page instead of the default sign-in page
    error: "/auth/login",  // Redirect to the login page instead of /api/auth/error
  },
});