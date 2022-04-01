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
const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${config.pepper}${password}`, salt);
};
const returning = " RETURNING id, username,first_name,last_name,email";
export class UserModel {
  async selectAll(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users_table";
      const resualt = await conn.query(sql);
      conn.release();
      return resualt.rows;
    } catch (error) {
      throw new Error(`error ${error}`);
    }
  }
  async selectUser(id: string): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT FROM users_table where id=($1)`;
      const resault = await conn.query(sql, [id]);
      conn.release();
      return resault.rows[0];
    } catch (err) {
      throw new Error(`error ${err}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users_table (username,first_name,last_name,email,password) VALUES ($1,$2,$3,$4,$5) returning *";
      const resault = await conn.query(sql, [
        u.username,
        u.first_name,
        u.last_name,
        u.email,
        hashPassword(u.password),
      ]);
      conn.release();
      return resault.rows[0];
    } catch (error) {
      throw new Error(` Error: ${error}`);
    }
  }
  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM users_table WHERE id=$1" + returning;
      console.log(sql);
      const resault = await conn.query(sql, [id]);
      conn.release();
      return resault.rows[0];
    } catch (error) {
      throw new Error(`Error:${error}`);
    }
  }
  async updateUser(u: User): Promise<User> {
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
      return resault.rows[0];
    } catch (error) {
      throw new Error(`Error:${error}`);
    }
  }
}
