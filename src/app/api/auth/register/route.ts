import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email and password are required!" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for existing user by email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "This email already exists." },
        { status: 400 }
      );
    }

    // Check for existing user by username
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return NextResponse.json(
        { error: "This username already exists." },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      username,
      email,
      password,
      profilePicture: "",
    });

    if (newUser) {
      return NextResponse.json(
        { message: "User registered successfully!" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
