import { client } from "../database";
export type Product = {
  id?: string;
  name: string;
  price: number;
};

export class ProductModel {
  async selectAll(): Promise<Product[] | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products_table ";
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
  async selectProduct(id: string): Promise<Product | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products_table WHERE id=$1 `;
      const resault = await conn.query(sql, [id]);
      console.log(id);
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
  async create(p: Product): Promise<Product | null> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO products_table (name,price) VALUES($1,$2) RETURNING *";
      const resault = await conn.query(sql, [p.name, p.price]);
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
  async delete(id: string): Promise<Product | null> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM products_table WHERE id=$1 RETURNING *";
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
  async updateProduct(p: Product): Promise<Product | null> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE products_table SET name=$1, price=$2 WHERE id=$3 RETURNING *";
      const resault = await conn.query(sql, [p.name, p.price, p.id]);
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
}
