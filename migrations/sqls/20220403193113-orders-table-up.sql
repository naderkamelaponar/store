/* UP UP UP UP UP  */
/** Orders Table **/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders_table (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,  order_status VARCHAR(15),
    user_id uuid REFERENCES users_table(id)
);