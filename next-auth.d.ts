import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: String;
      username: string;
      profilePicture: string;
    } & DefaultSession["user"];
  }
  
  interface User {
    username: string;
    profilePicture: string;
  }
}
