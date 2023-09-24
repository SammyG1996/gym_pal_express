"use strict";

/** Shared config for application; can be required many places. */

import dotenv from "dotenv";
import "colors";

dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

export const CLIENT_ID = process.env.CLIENT_ID

export const PORT = process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
export function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "gym_pal"
      : process.env.DATABASE_URL || "gym_pal";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
export const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("gym_pal Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");