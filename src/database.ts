import { Pool } from "pg";
import config from "./config";
console.log(config.database);
export const client = new Pool({
  database: config.database,
  host: config.host,
  user: config.user,
  password: config.password,
});
client.on("error", (error: Error) => {
  console.error(error.message);
});
