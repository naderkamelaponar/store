// بسم الله الرحمن الرحيم
import { client } from "../database";
import { Product } from "./products.model";
export type ProductOrder = {
   list_index?: number;
   product_id: string;
   quantity: number;
};
async function setListNo(): Promise<boolean> {
   try {
      const conn = await client.connect();
      const maxNo = await conn.query(
         "SELECT * FROM shopping_cart_table ORDER BY list_no ASC "
      );
      if (maxNo.rows.length) {
         for (let i = 0; i < maxNo.rows.length; i++) {
            if (maxNo.rows[i]["list_no"] !== i + 1) {
               await conn.query(
                  "UPDATE shopping_cart_table SET list_no=$1 WHERE product_id=$2 AND order_id=$3 RETURNING *",
                  [
                     i + 1,
                     maxNo.rows[i]["product_id"],
                     maxNo.rows[i]["order_id"],
                  ]
               );
            }
         }
      }
      conn.release();
      return true;
   } catch (error) {
      throw new Error(`Error:${error}`);
   }
}
export class shoppingCartsModel {
   async isExists(
      orderId: string,
      productId: string
   ): Promise<ProductOrder | null> {
      try {
         const conn = await client.connect();

         const sql =
            "SELECT * FROM shopping_cart_table WHERE order_id=($1) AND product_id =($2)";
         const resault = await conn.query(sql, [orderId, productId]);
         conn.release();
         return resault.rows.length ? resault.rows[0] : null;
      } catch (error) {
         throw new Error(`Error:${error}`);
      }
   }
   async listNo(orderId: string): Promise<number> {
      try {
         const conn = await client.connect();
         const maxNo = await (
            await conn.query(
               "SELECT COUNT(*) FROM shopping_cart_table WHERE order_id=$1 ",
               [orderId]
            )
         ).rows[0]["count"];
         return parseInt(maxNo) + 1;
      } catch (error) {
         throw new Error(`Error:${error}`);
      }
   }
   async addToCart(
      listNo: number,
      quantity: number,
      orderId: string,
      productId: string
   ): Promise<ProductOrder | null> {
      try {
         const conn = await client.connect();
         const sql =
            "INSERT INTO shopping_cart_table (list_no,quantity,order_id,product_id) VALUES(($1),($2),($3),($4)) RETURNING *";
         const resault = await conn.query(sql, [
            listNo,
            quantity,
            orderId,
            productId,
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
   async updateCart(
      quantity: number,
      orderId: string,
      productId: string
   ): Promise<ProductOrder | null> {
      try {
         const conn = await client.connect();
         const sql =
            "UPDATE shopping_cart_table SET quantity=$1,product_id=$2 WHERE order_id=$3  RETURNING *";
         const resault = await conn.query(sql, [
            quantity,
            productId,
            orderId,
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
   async deleteFromCart(
      productId: string,
      orderId: string
   ): Promise<ProductOrder | null> {
      try {
         const conn = await client.connect();
         const sql =
            "DELETE FROM shopping_cart_table WHERE order_id=($1) AND product_id=($2) RETURNING *";
         const resault = await conn.query(sql, [orderId, productId]);
         conn.release();
         const setNos = await setListNo();
         if (resault.rows.length && setNos) {
            return resault.rows[0];
         } else {
            return null;
         }
      } catch (error) {
         throw new Error(`Error:${error}`);
      }
   }
   async orderProducts(orderId: string): Promise<Product[] | null> {
      try {
         const conn = await client.connect();
         const sql = `SELECT list_no ,product_id,product_name,price ,quantity FROM products_table INNER JOIN shopping_cart_table  ON products_table.id = shopping_cart_table.product_id WHERE shopping_cart_table.order_id=$1 ORDER BY list_no ASC ;`;

         const resault = await conn.query(sql, [orderId]);
         conn.release();
         if (resault.rows.length) {
            return resault.rows;
         } else {
            return null;
         }
      } catch (err) {
         throw new Error(`error ${err}`);
      }
   }
}
