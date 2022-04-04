/* UP UP UP UP UP  */
/** Users Table **/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users_table (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, username VARCHAR(50) NOT NULL,first_name VARCHAR(50) NOT NULL,last_name VARCHAR(50) NOT NULL,email VARCHAR(100)NOT NULL,password VARCHAR(150) NOT NULL);