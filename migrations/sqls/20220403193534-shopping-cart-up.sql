/* UP UP UP UP UP  */
/** Shopping Cart Table **/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE shopping_cart_table (list_no integer,  order_id uuid REFERENCES orders_table(id),
product_id uuid REFERENCES products_table(id),quantity integer
);