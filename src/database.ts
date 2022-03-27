import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();
const { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } =
  process.env;
export const client = new Pool({
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});
