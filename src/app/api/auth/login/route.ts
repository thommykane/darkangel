import { NextResponse } from "next/server";
import { seedAdminUsers, findUserByEmail } from "@/lib/users";
import {
  createSessionToken,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await seedAdminUsers();

    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      mustChangePassword: user.must_change_password,
    };

    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      mustChangePassword: user.must_change_password,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Unable to sign in. Please try again." },
      { status: 500 }
    );
  }
}
