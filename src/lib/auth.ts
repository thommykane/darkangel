import "server-only";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "da_session";

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  mustChangePassword: boolean;
}

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({
    sub: String(user.id),
    name: user.name,
    email: user.email,
    mustChangePassword: user.mustChangePassword,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const id = Number(payload.sub);
    if (!id || !payload.email || !payload.name) return null;

    return {
      id,
      name: String(payload.name),
      email: String(payload.email),
      mustChangePassword: Boolean(payload.mustChangePassword),
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
