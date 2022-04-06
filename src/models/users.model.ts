import { client } from "../database";
import bcrypt from "bcrypt";
import config from "../config";
export type User = {
  id?: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
const checkUserName = async (username: string): Promise<string | null> => {
  const conn = await client.connect();
  const sql = "SELECT id FROM users_table WHERE username =$1";
  const resault = await conn.query(sql, [username]);
  conn.release();
  if (resault.rows.length) {
    return resault.rows[0]["id"];
  } else {
    return null;
  }
};
const returning = "returning id,username,first_name,last_name,email ";
const hashPassword = (password: string): string => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${config.pepper}${password}`, salt);
};

export class UserModel {
  async selectAll(): Promise<User[] | null> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT id,username,first_name,last_name,email FROM users_table ";
      const resault = await conn.query(sql);
      conn.release();
      if (resault.rows.length) {
        return resault.rows;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`error ${error}`);
    }
  }
  async selectUser(id: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT  id,username,first_name,last_name,email FROM users_table WHERE id=$1 `;
      const resault = await conn.query(sql, [id]);
      conn.release();
      if (resault.rows.length) {
        return resault.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`error ${err}`);
    }
  }
  async create(u: User): Promise<User | null> {
    try {
      const username = await checkUserName(u.username);
      if (username) {
        return null;
      }
      const conn = await client.connect();
      const sql =
        "INSERT INTO users_table (username,first_name,last_name,email,password) VALUES ($1,$2,$3,$4,$5) " +
        returning;
      const resault = await conn.query(sql, [
        u.username,
        u.first_name,
        u.last_name,
        u.email,
        hashPassword(u.password),
      ]);
      conn.release();
      if (resault.rows.length) {
        return resault.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(` Error: ${error}`);
    }
  }
  async delete(id: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users_table WHERE id=$1 " + returning;
      const resault = await conn.query(sql, [id]);
      conn.release();
      if (resault.rows.length) {
        return resault.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error:${error}`);
    }
  }
  async updateUser(u: User): Promise<User | null> {
    const uId = await checkUserName(u.username);
    if (uId !== null && uId !== u.id) {
      return null;
    }
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users_table SET email=($1), username=($2), first_name=($3), last_name=($4),password=($5) WHERE id=($6) " +
        returning;
      const resault = await conn.query(sql, [
        u.email,
        u.username,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
        u.id,
      ]);
      conn.release();
      if (resault.rows.length) {
        return resault.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error:${error}`);
    }
  }
  async login(username: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const resault = await conn.query(
        "SELECT password FROM users_table WHERE username=$1",
        [username]
      );
      if (resault.rows.length) {
        const { password: hashPassword } = resault.rows[0];
        const isValid = bcrypt.compareSync(
          `${config.pepper}${password}`,
          hashPassword
        );
        if (isValid) {
          const userData = await conn.query(
            "SELECT id,username,first_name,last_name,email from users_table WHERE username=$1",
            [username]
          );
          conn.release();
          return userData.rows[0];
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Error:${error}`);
    }
  }
}
