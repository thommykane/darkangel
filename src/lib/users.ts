import "server-only";
import { query } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

interface DbUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  must_change_password: boolean;
}

const ADMIN_ACCOUNTS = [
  { name: "Company Admin", email: "shyleehalimi@gmail.com", password: "12345678" },
  { name: "Site Admin", email: "tjabate@gmail.com", password: "12345678" },
] as const;

export async function seedAdminUsers() {
  for (const admin of ADMIN_ACCOUNTS) {
    const existing = await query<DbUser>(
      "SELECT id FROM users WHERE email = $1",
      [admin.email.toLowerCase()]
    );

    if (existing.rows.length > 0) continue;

    const passwordHash = await hashPassword(admin.password);
    await query(
      `INSERT INTO users (name, email, password_hash, must_change_password)
       VALUES ($1, $2, $3, TRUE)`,
      [admin.name, admin.email.toLowerCase(), passwordHash]
    );
  }
}

export async function findUserByEmail(email: string) {
  const result = await query<DbUser>(
    "SELECT * FROM users WHERE email = $1",
    [email.toLowerCase()]
  );
  return result.rows[0] ?? null;
}

export async function findUserById(id: number) {
  const result = await query<DbUser>("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

export async function updateUserPassword(id: number, passwordHash: string) {
  await query(
    "UPDATE users SET password_hash = $1, must_change_password = FALSE WHERE id = $2",
    [passwordHash, id]
  );
}

export interface EmailSubscriber {
  id: number;
  first_name: string;
  last_name: string;
  city: string | null;
  state: string | null;
  zip: string | null;
  city_state_zip: string | null;
  phone: string;
  email: string;
  created_at: string;
}

export async function createEmailSubscriber(data: {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}) {
  const result = await query<EmailSubscriber>(
    `INSERT INTO email_subscribers (first_name, last_name, city, state, zip, phone, email)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      data.firstName,
      data.lastName,
      data.city,
      data.state,
      data.zip,
      data.phone,
      data.email.toLowerCase(),
    ]
  );
  return result.rows[0];
}

export async function getEmailSubscribers() {
  const result = await query<EmailSubscriber>(
    `SELECT * FROM email_subscribers ORDER BY created_at DESC`
  );
  return result.rows;
}
