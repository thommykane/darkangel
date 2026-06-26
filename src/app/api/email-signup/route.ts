import { NextResponse } from "next/server";
import { createEmailSubscriber } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const cityStateZip = String(body.cityStateZip ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!firstName || !lastName || !cityStateZip || !phone || !email) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await createEmailSubscriber({
      firstName,
      lastName,
      cityStateZip,
      phone,
      email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email signup error:", error);
    return NextResponse.json(
      { error: "Unable to join the email list. Please try again." },
      { status: 500 }
    );
  }
}
