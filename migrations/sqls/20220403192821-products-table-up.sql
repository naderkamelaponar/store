/* UP UP UP UP UP  */
/** Products Table **/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products_table (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,  product_name VARCHAR(100) NOT NULL,
    price integer NOT NULL);