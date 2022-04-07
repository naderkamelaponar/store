import { client } from "../database";
import bcrypt from "bcrypt";
import config from "../config";
export type User = {
  id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  shippingAddress: string;
  password: string;
};
const checkUniques = async (
  username: string,
  email: string
): Promise<string | null> => {
  const conn = await client.connect();
  const sql = "SELECT id FROM users_table WHERE username =$1 OR email=$2";
  const resault = await conn.query(sql, [username, email]);
  conn.release();
  if (resault.rows.length) {
    return resault.rows[0]["id"];
  } else {
    return null;
  }
};
const colmuns =
  " id,username,email,mobile_phone,first_name,last_name,shipping_address ";
const hashPassword = (password: string): string => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${config.pepper}${password}`, salt);
};

export class UserModel {
  async selectAll(): Promise<User[] | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT ${colmuns} FROM users_table`;
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
      const sql = `SELECT ${colmuns} FROM users_table WHERE id=$1 `;
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
      const isTakenData = await checkUniques(u.username, u.email);
      if (isTakenData) {
        return null;
      }
      const conn = await client.connect();
      const sql = `INSERT INTO users_table(username,email,mobile_phone,first_name,last_name,shipping_address,password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING ${colmuns}`;
      const resault = await conn.query(sql, [
        u.username,
        u.email,
        u.mobilePhone,
        u.firstName,
        u.lastName,
        u.shippingAddress,
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
      const sql = `DELETE FROM users_table WHERE id=$1 RETURNING ${colmuns}`;
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
    const uId = await checkUniques(u.username, u.email);
    if (uId !== null && uId !== u.id) {
      return null;
    }
    try {
      const conn = await client.connect();
      const sql = `UPDATE users_table SET username=($1), email=($2),mobile_phone=($3),first_name=($4), last_name=($5),shipping_address=($6),password=($7) WHERE id=($8) RETURNING ${colmuns}`;
      const resault = await conn.query(sql, [
        u.username,
        u.email,
        u.mobilePhone,
        u.firstName,
        u.lastName,
        u.shippingAddress,
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
  async login(
    loginWord: string,
    password: string,
    loginBy: string
  ): Promise<User | null> {
    try {
      const criteria: string =
        loginBy === `username` ? ` username ` : ` email `;
      const conn = await client.connect();
      let sql = `SELECT password FROM users_table WHERE ${criteria}=$1`;

      const resault = await conn.query(sql, [loginWord]);
      if (resault.rows.length) {
        const { password: hashPassword } = resault.rows[0];
        const isValid = bcrypt.compareSync(
          `${config.pepper}${password}`,
          hashPassword
        );
        if (isValid) {
          sql = `SELECT ${colmuns} FROM users_table WHERE ${criteria} =$1`;
          const userData = await conn.query(sql, [loginWord]);
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
