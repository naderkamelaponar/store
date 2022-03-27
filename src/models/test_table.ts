import { client } from "../database";
export type testTable = {
  id: number;
  field1: string;
  field2: string;
};
export class testTableStore {
  async index(): Promise<testTable[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM test_table";
      const resualt = await conn.query(sql);
      conn.release();
      return resualt.rows;
    } catch (error) {
      throw new Error(`error ${error}`);
    }
  }
  async show(id: string): Promise<testTable[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM test_table where id=($1)`;
      const resault = await conn.query(sql, [id]);
      conn.release();
      return resault.rows[0];
    } catch (err) {
      throw new Error(`error ${err}`);
    }
  }
  async create(nT: testTable): Promise<testTable> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO test_table (id,field1,field2) VALUES ($1,$2,$3) RETURNING *";
      const resault = await conn.query(sql, [nT.id, nT.field1, nT.field2]);
      conn.release();
      return resault.rows[0];
    } catch (error) {
      throw new Error(` Error: ${error}`);
    }
  }
  async delete(id: string): Promise<testTable> {
    try {
      const conn = await client.connect();
      const sql = "DELETE * FROM test_table where id=($1)";
      const resault = await conn.query(sql, [id]);
      conn.release();
      return resault.rows[0];
    } catch (error) {
      throw new Error(`Error:${error}`);
    }
  }
}
