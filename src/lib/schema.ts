import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const guests = pgTable("guests", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  willAttend: boolean("will_attend").notNull(),
  eventDate: date("event_date").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  reminder7Sent: boolean("reminder_7_sent").notNull().default(false),
  reminder3Sent: boolean("reminder_3_sent").notNull().default(false),
  reminderDaySent: boolean("reminder_day_sent").notNull().default(false),
  confirmedDay: boolean("confirmed_day").notNull().default(false),
});

export type Guest = typeof guests.$inferSelect;
export type NewGuest = typeof guests.$inferInsert;
