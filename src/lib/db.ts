import "server-only";
import { Pool } from "pg";

const globalForPg = globalThis as typeof globalThis & {
  pgPool?: Pool;
  dbInitialized?: Promise<void>;
};

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!globalForPg.pgPool) {
    const connectionString = process.env.DATABASE_URL;
    const isLocal = connectionString.includes("localhost");

    // pg v8+ treats sslmode=require as strict verify-full; Railway uses a cert
    // chain that fails that check unless we opt into libpq-compatible SSL handling.
    let url = connectionString;
    if (!isLocal && !url.includes("uselibpqcompat=")) {
      url += url.includes("?") ? "&" : "?";
      url += "uselibpqcompat=true";
    }

    globalForPg.pgPool = new Pool({
      connectionString: url,
      ssl: isLocal ? false : { rejectUnauthorized: false },
    });
  }

  return globalForPg.pgPool;
}

export async function initializeDatabase() {
  if (!globalForPg.dbInitialized) {
    globalForPg.dbInitialized = (async () => {
      const pool = getPool();

      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS email_subscribers (
          id SERIAL PRIMARY KEY,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          city TEXT,
          state TEXT,
          zip TEXT,
          city_state_zip TEXT,
          phone TEXT NOT NULL,
          email TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);

      await pool.query(`ALTER TABLE email_subscribers ADD COLUMN IF NOT EXISTS city TEXT`);
      await pool.query(`ALTER TABLE email_subscribers ADD COLUMN IF NOT EXISTS state TEXT`);
      await pool.query(`ALTER TABLE email_subscribers ADD COLUMN IF NOT EXISTS zip TEXT`);
    })();
  }

  await globalForPg.dbInitialized;
}

export async function query<T>(
  text: string,
  params?: unknown[]
): Promise<{ rows: T[]; rowCount: number | null }> {
  await initializeDatabase();
  const result = await getPool().query(text, params);
  return { rows: result.rows as T[], rowCount: result.rowCount };
}
