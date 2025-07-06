import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
    async signIn({ user, account, profile }) {
      console.log("SignIn callback triggered:", { 
        provider: account?.provider, 
        userEmail: user.email,
        hasAccount: !!account 
      });
      
      if (account?.provider === "google") {
        try {
          console.log("Processing Google OAuth sign in...");
          await connectDB();

          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });
          console.log("Existing user found:", !!existingUser);

          if (!existingUser) {
            console.log("Creating new user from Google OAuth...");
            
            // Generate a unique username
            let username = user.name || user.email?.split("@")[0] || "user";
            let counter = 1;
            let finalUsername = username;
            
            // Check if username exists and generate a unique one
            while (await User.findOne({ username: finalUsername })) {
              finalUsername = `${username}${counter}`;
              counter++;
            }
            
            // Create new user from Google OAuth
            const newUser = await User.create({
              email: user.email,
              username: finalUsername,
              profilePicture: user.image || "",
              // Google OAuth users don't have passwords
            });

            user.id = newUser._id.toString();
            user.username = newUser.username;
            user.profilePicture = newUser.profilePicture;
            console.log("New user created successfully:", user.id);
          } else {
            console.log("Updating existing user...");
            // Update existing user's Google info
            user.id = existingUser._id.toString();
            user.username = existingUser.username;
            user.profilePicture =
              existingUser.profilePicture || user.image || "";
          }
        } catch (error: any) {
          console.error("Error during Google sign in:", error);
          console.error("Error details:", JSON.stringify(error, null, 2));
          
          // Handle duplicate key errors specifically
          if (error.code === 11000) {
            console.log("Duplicate key error detected, attempting to find existing user...");
            try {
              // Try to find the user by email instead
              const existingUserByEmail = await User.findOne({ email: user.email });
              if (existingUserByEmail) {
                console.log("Found existing user by email, updating...");
                user.id = existingUserByEmail._id.toString();
                user.username = existingUserByEmail.username;
                user.profilePicture = existingUserByEmail.profilePicture || user.image || "";
                return true;
              }
            } catch (findError) {
              console.error("Error finding existing user:", findError);
            }
          }
          
          return false;
        }
      }
      return true;
    },
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
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};
