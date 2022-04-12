# Storefront Backend

-  ### Install dependencies

```bash
npm install
```

## Set up Database

-  #### In psql run the following commands :

```bash
CREATE DATABASE tyre_store;
CREATE DATABASE tyre_store_test;
CREATE USER tyre_store_user WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE tyre_store TO tyre_store_user;
GRANT ALL PRIVILEGES ON DATABASE tyre_store_test TO tyre_store_user;
```

## .env variables

```
PORT=3000
NODE_ENV='dev'
POSTGRES_HOST='localhost'
POSTGRES_PORT='5432'
POSTGRES_DB='tyre_store'
POSTGRES_DB_TEST='tyre_store_test'
POSTGRES_USER='tyre_store_user'
POSTGRES_PASSWORD='password123'
PEPPER='$#n DSJ kjs#01892'
SALT=10
TOKEN_SECRET='my_token_secret'
```

## Testing

### dev Environment

```bash
npm run dev:test
```

### test Environment

```bash
npm run test
```

## Start the App

###

-  ##### Create the required tables

```bash
db-migrate up
```

-  ##### Start App in typescript

```bash
npm run start:ts
```

-  ##### Start App in javascript

```bash
npm run start:js
```

## Token and Authorizations

```
 Authorization   Bearer <token>
```
