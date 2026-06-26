import { readFileSync } from "fs";
import pg from "pg";

const env = readFileSync(".env", "utf8");
const match = env.match(/^DATABASE_URL=(.+)$/m);
if (!match) {
  console.error("No DATABASE_URL in .env");
  process.exit(1);
}

const connectionString = match[1].trim();
const isLocal = connectionString.includes("localhost");
let url = connectionString;
if (!isLocal && !url.includes("uselibpqcompat=")) {
  url += url.includes("?") ? "&" : "?";
  url += "uselibpqcompat=true";
}

const pool = new pg.Pool({
  connectionString: url,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

try {
  const ping = await pool.query("SELECT 1 as ok");
  console.log("DB connection:", ping.rows[0]);

  const tables = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
  );
  console.log("Tables:", tables.rows.map((r) => r.table_name).join(", ") || "(none)");

  const users = await pool.query("SELECT id, name, email FROM users").catch((e) => {
    console.log("users query error:", e.message);
    return { rows: [] };
  });
  console.log("Users:", users.rows);
} catch (e) {
  console.error("FAIL:", e.message);
  process.exit(1);
} finally {
  await pool.end();
}
