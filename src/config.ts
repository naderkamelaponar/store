import dotenv from "dotenv";
dotenv.config();
const {
  NODE_ENV,
  PORT,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  PEPPER,
  SALT,
  TOKEN_SECRET,
} = process.env;

export default {
  env: NODE_ENV,
  host: POSTGRES_HOST,
  port: PORT,
  dbPort: POSTGRES_PORT,
  database: NODE_ENV == "test" ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  pepper: PEPPER,
  salt: SALT,
  tokenSecret: TOKEN_SECRET,
};
