import dns from "dns";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

dns.setDefaultResultOrder("ipv4first");

const client = postgres(process.env.DATABASE_URL!, {
  ssl: process.env.NODE_ENV === "production" ? "require" : false,
  max: 5,
});

export const db = drizzle(client, { schema });
