# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-  Create (args: Product)[token required]
-  Index
-  Show (params:id)
-  Update (params:id , args:Product) [token required]
-  Delete (params: id ) [token required]

#### Users

-  Create (args: User)
-  Index
-  Show (params: id)[token required]
-  Update (params: id)[token required]
-  Delete (params: id)[token required]

#### Orders

-  Current Order by user (args: user id)[token required]
-  [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

-  id
-  product_name
-  price

#### User

-  id
-  [additional] username `UNIQUE`
-  [additional] email `UNIQUE`
-  first_name
-  last_name
-  [optional] mobile_phone
-  [additional] shipping_address
-  password

#### Orders

-  id
-  id of each product in the order
-  quantity of each product in the order
-  user_id
-  status of order (active or complete)
