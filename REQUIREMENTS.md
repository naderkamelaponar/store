# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

# API Endpoints

---

# Products

## `'/products/'`

-  #### [POST] '/products/' Create (args: Product)[token required]
-  #### [GET] '/products/' ShowAll
-  #### [GET] '/products/:id' ShowOneProduct (params:id)
-  #### [PATCH]'/products/:id' Update (params:id , args:Product) [token required]
-  #### [DELTE]'/products/:id' Delete (params: id ) [token required]

#### Product Input sample

```bash
{
"id": "cb4eb7b7-ae2b-44c8-9ec1-ae3201cbb0f4",
"product_name": "NANKANG 165R13C",
"price": 2000
}
```

---

# Users

## `'/users/'`

-  #### [GET] '/users/' ShowAll
-  #### [POST] '/users/' Create (args: user)
-  #### [PATCH] '/users/:id' Update (params:id , args:user) [token required]
-  #### [DELETE] '/users/:id' DELETE (params:id) [token required][login required]
-  #### [POST] '/users/login' Login

#### User Input sample

```bash
{
"id":"b0620b2b-38b3-4479-8221-149a3bc0b569"
"username":"naderkamel","first_name":
"nader","last_name":"kamel",
"email":"nader.kamel.the.programmer@gmail.com",
"mobile_phone":"","password":"password123",
"shipping_address":"Alexandria Egypt"
}

```

#### Login Input sample

```bash
{
"username":"naderkamel",
"email":"nader.kamel.the.programmer@gmail.com",
"password":"password123"
}

```

##### _User is able to Login with (username | email) AND password_

---

# Orders [token required]

## `'/:user_id/orders/'`

-  #### [POST] '/:user_id/orders/' Create new order
-  #### [GET] '/:user_id/orders/' Show All orders

## `'/:user_id/orders/:order_id'`

-  #### [GET] '/:user_id/orders/:order_id' Show a specified order
-  #### [POST] '/:user_id/orders/:order_id' add Product to Order
-  #### [PATCH] '/:user_id/orders/:order_id' update Product to Order
-  #### [DELETE] '/:user_id/orders/:order_id' delete Product to Order

#### Product To Order sample

```bash
{"product_id": "035d1523-fcfb-4132-9009-b7fef70c61f5",
"quantity": 4
 }
```

-  #### [GET] `'/:user_id/orders/:order_id/products'` show Product in order
-  #### [POST] `'/:user_id/orders/:order_id/complete'` [login required] Complete the Purchase

---

## Data Shapes

#### Product

-  id
-  product_name
-  price

#### User

-  id
-  username `UNIQUE`
-  email `UNIQUE`
-  first_name
-  last_name
-  [optional] mobile_phone
-  shipping_address
-  password

---

#### Orders

-  id
-  list_no of each product in the order
-  quantity of each product in the order
-  user_id
-  order_status of order (active or complete)

## DATABASE schema

-  ### users_table

```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users_table(id uuid DEFAULT
uuid_generate_v4() PRIMARY KEY,
username VARCHAR(50) UNIQUE,mobile_phone
VARCHAR(50),first_name VARCHAR(50) NOT
NULL,last_name VARCHAR(50) NOT NULL,email
VARCHAR(100)UNIQUE,
shipping_address text NOT NULL,
password VARCHAR(150) NOT NULL);
```

-  ### products_table

```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products_table
(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
product_name VARCHAR(100) NOT NULL,
price integer NOT NULL);
```

-  ### orders_table

```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders_table
(id uuid DEFAULT uuid_generate_v4()
PRIMARY KEY, order_status
VARCHAR(15),user_id uuid REFERENCES
users_table(id));
```

-  ### shopping_cart_table

```bash
CREATE TABLE shopping_cart_table
(list_no integer,  order_id uuid
REFERENCES orders_table(id),
product_id uuid REFERENCES
products_table(id),quantity integer);
```
