-- Migration: create guests table
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS guests (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(255) NOT NULL,
  email            VARCHAR(255) NOT NULL UNIQUE,
  will_attend      BOOLEAN NOT NULL,
  event_date       DATE NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reminder_7_sent  BOOLEAN NOT NULL DEFAULT FALSE,
  reminder_3_sent  BOOLEAN NOT NULL DEFAULT FALSE,
  reminder_day_sent BOOLEAN NOT NULL DEFAULT FALSE,
  confirmed_day    BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_guests_email ON guests(email);
CREATE INDEX IF NOT EXISTS idx_guests_event_date ON guests(event_date);
