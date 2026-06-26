import { NextResponse } from "next/server";
import { getSession, hashPassword, createSessionToken, setSessionCookie } from "@/lib/auth";
import { updateUserPassword } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const newPassword = String(body.newPassword ?? "");
    const confirmPassword = String(body.confirmPassword ?? "");

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(newPassword);
    await updateUserPassword(session.id, passwordHash);

    const updatedSession = {
      ...session,
      mustChangePassword: false,
    };

    const token = await createSessionToken(updatedSession);
    await setSessionCookie(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Unable to update password." },
      { status: 500 }
    );
  }
}
