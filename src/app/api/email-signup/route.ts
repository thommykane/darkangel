import { NextResponse } from "next/server";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { createEmailSubscriber } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const city = String(body.city ?? "").trim();
    const state = String(body.state ?? "").trim();
    const zip = String(body.zip ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const recaptchaToken = String(body.recaptchaToken ?? "").trim();

    if (!firstName || !lastName || !city || !state || !zip || !phone || !email) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Please complete the captcha." },
        { status: 400 }
      );
    }

    const captchaValid = await verifyRecaptcha(recaptchaToken);
    if (!captchaValid) {
      return NextResponse.json(
        { error: "Captcha verification failed. Please try again." },
        { status: 400 }
      );
    }

    if (!/^\d{5}(-\d{4})?$/.test(zip)) {
      return NextResponse.json(
        { error: "Please enter a valid ZIP code." },
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
      city,
      state,
      zip,
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
