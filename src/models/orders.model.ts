import { client } from "../database";
import { Product } from "./products.model";
export type Order = {
  id?: string;
  status: string;
  userId: string;
};
export type ProductOrder = {
  id: string;
  quantity: number;
  orderId: string;
  productId: string;
};
export class OrdersModel {
  async selectAll(userId: string): Promise<Order[] | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders_table WHERE user_id=$1 ";
      const resault = await conn.query(sql, [userId]);
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
  async selectOrder(userId: string, orderId: string): Promise<Order | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders_table WHERE id=$1 AND user_id=$2 `;
      const resault = await conn.query(sql, [orderId, userId]);
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
  async newOrder(userId: string): Promise<Order | null> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders_table (user_id,order_status) VALUES($1,'active') RETURNING *";
      const resault = await conn.query(sql, [userId]);
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
  async addToCart(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<ProductOrder | null> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO shopping_cart_table (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *";
      const resault = await conn.query(sql, [quantity, orderId, productId]);
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
    productId: string,
    productOrderId: string
  ): Promise<ProductOrder | null> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE shopping_cart_table SET quantity=$1,product_id=$2 WHERE order_id=$3 AND id=$4 RETURNING *";
      const resault = await conn.query(sql, [
        quantity,
        productId,
        orderId,
        productOrderId,
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
    productOrderId: string,
    orderId: string
  ): Promise<ProductOrder | null> {
    try {
      const conn = await client.connect();
      const sql =
        "DELETE FROM shopping_cart_table WHERE order_id=$1 AND id=$2 RETURNING *";
      const resault = await conn.query(sql, [orderId, productOrderId]);
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
  async checkOut(
    orderId: string,
    userId: string
  ): Promise<ProductOrder | null> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE FROM orders_table SET status='DONE' WHERE order_id=$1 AND user_id=$2 RETURNING *";
      const resault = await conn.query(sql, [orderId, userId]);
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
  async orderProducts(orderId: string): Promise<Product[] | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT product_name,product_price ,quantity FROM products_table INNER JOIN shopping_cart_table  ON products_table.id = shopping_cart_table.product_id WHERE shopping_cart_table.order_id=$1;`;

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
