import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required!" },
        { status: 400 }
      );
    }

    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "This email already exist." },
        { status: 400 }
      );
    }

    const newUser = await User.create({ email, password });
    return NextResponse.json(
      { message: "User register successfullly!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Fail to register User" },
      { status: 500 }
    );
  }
}
