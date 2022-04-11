import { client } from "../database";
export type Product = {
   id?: string;
   product_name: string;
   price: number;
};
export class ProductsModel {
   async idExists(id: string): Promise<boolean> {
      try {
         const pattern =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
         if (pattern.test(id)) {
            const conn = await client.connect();
            const sql = `SELECT * FROM products_table WHERE id =($1)`;
            const resault = await conn.query(sql, [id]);
            conn.release();
            return resault.rows.length ? true : false;
         }
         return false;
      } catch (error) {
         throw new Error(`error ${error}`);
      }
   }
   async selectAll(): Promise<Product[] | null> {
      try {
         const conn = await client.connect();
         const sql = "SELECT * FROM products_table ";
         const resault = await conn.query(sql);
         conn.release();
         return resault.rows.length ? resault.rows : null;
      } catch (error) {
         throw new Error(`error ${error}`);
      }
   }
   async selectProduct(id: string): Promise<Product | null> {
      try {
         const conn = await client.connect();
         const sql = `SELECT * FROM products_table WHERE id=$1 `;
         const resault = await conn.query(sql, [id]);
         conn.release();
         return resault.rows.length ? resault.rows[0] : null;
      } catch (err) {
         throw new Error(`error ${err}`);
      }
   }
   async create(p: Product): Promise<Product | null> {
      try {
         const conn = await client.connect();
         const sql =
            "INSERT INTO products_table (product_name,price) VALUES($1,$2) RETURNING *";
         const resault = await conn.query(sql, [
            p.product_name,
            p.price,
         ]);
         conn.release();
         return resault.rows.length ? resault.rows[0] : null;
      } catch (error) {
         throw new Error(` Error: ${error}`);
      }
   }
   async delete(id: string): Promise<Product | null> {
      try {
         const conn = await client.connect();
         const sql =
            "DELETE FROM products_table WHERE id=$1 RETURNING *";
         const resault = await conn.query(sql, [id]);
         conn.release();
         return resault.rows.length ? resault.rows[0] : null;
      } catch (error) {
         throw new Error(`Error:${error}`);
      }
   }
   async updateProduct(p: Product): Promise<Product | null> {
      try {
         const conn = await client.connect();
         const sql =
            "UPDATE products_table SET product_name=$1, price=$2 WHERE id=$3 RETURNING *";
         const resault = await conn.query(sql, [
            p.product_name,
            p.price,
            p.id,
         ]);
         conn.release();
         return resault.rows.length ? resault.rows[0] : null;
      } catch (error) {
         throw new Error(`Error:${error}`);
      }
   }
}
