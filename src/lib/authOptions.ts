import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email password!");
        }
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found!");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid password!");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            profilePicture: user.profilePicture,
          };
        } catch {
          console.error("Error during authentication");
          throw new Error("User not authenticate successfully!");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.profilePicture = user.profilePicture;
      }

      // Handle session updates (like profile picture changes)
      if (trigger === "update" && session) {
        if (session.profilePicture) {
          token.profilePicture = session.profilePicture;
        }
        // Fetch latest user data from database
        try {
          await connectDB();
          const updatedUser = await User.findById(token.id);
          if (updatedUser) {
            token.profilePicture = updatedUser.profilePicture;
          }
        } catch (error) {
          console.error("Error fetching updated user data:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.profilePicture = token.profilePicture as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret",
};
