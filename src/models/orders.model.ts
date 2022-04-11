import { client } from "../database";
export type Order = {
   id?: string;
   order_status: string;
   user_id: string;
};
export class OrdersModel {
   async idExists(id: string): Promise<boolean> {
      try {
         const pattern =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
         if (!pattern.test(id)) {
            return false;
         }
         const conn = await client.connect();
         const sql = `SELECT * FROM orders_table WHERE id =($1)`;
         const resault = await conn.query(sql, [id]);
         conn.release();
         return resault.rows.length ? true : false;
      } catch (error) {
         throw new Error(`error ${error}`);
      }
   }
   async isActive(userId: string): Promise<Order | null> {
      try {
         const conn = await client.connect();
         const sql = `SELECT * FROM orders_table WHERE user_id=($1) AND order_status='active'`;
         const resault = await conn.query(sql, [userId]);
         conn.release();
         return resault.rows.length ? resault.rows[0] : null;
      } catch (error) {
         throw new Error(`error ${error}`);
      }
   }
   async selectAll(userId: string): Promise<Order[] | null> {
      try {
         const conn = await client.connect();
         const sql = "SELECT * FROM orders_table WHERE user_id=$1 ";
         const resault = await conn.query(sql, [userId]);
         conn.release();
         return resault.rows.length ? resault.rows : null;
      } catch (error) {
         throw new Error(`error ${error}`);
      }
   }
   async selectOrder(
      orderId: string,
      userId: string
   ): Promise<Order | null> {
      try {
         const conn = await client.connect();
         const sql =
            "SELECT * FROM orders_table WHERE user_id=$1 AND id=$2";
         const resault = await conn.query(sql, [userId, orderId]);
         conn.release();
         return resault.rows.length ? resault.rows[0] : null;
      } catch (error) {
         throw new Error(`error ${error}`);
      }
   }
   async newOrder(userId: string): Promise<Order | null> {
      try {
         const conn = await client.connect();
         let sql =
            "SELECT * FROM orders_table WHERE user_id=$1 AND order_status='active' ";
         let resault = await conn.query(sql, [userId]);
         if (resault.rows.length) {
            return resault.rows[0];
         } else {
            sql =
               "INSERT INTO orders_table (user_id,order_status) VALUES($1,'active') RETURNING *";
            resault = await conn.query(sql, [userId]);
            return resault.rows[0];
         }
         conn.release();
      } catch (error) {
         throw new Error(` Error: ${error}`);
      }
   }

   async completeOrder(
      orderId: string,
      userId: string
   ): Promise<Order | null> {
      try {
         const conn = await client.connect();
         const sql =
            "UPDATE  orders_table SET order_status='complete' WHERE id=$1 AND user_id=$2 RETURNING *";
         const resault = await conn.query(sql, [orderId, userId]);
         conn.release();
         return resault.rows.length ? resault.rows[0] : null;
      } catch (error) {
         throw new Error(`Error:${error}`);
      }
   }
}
