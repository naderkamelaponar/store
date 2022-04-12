// بسم الله الرحمن الرحيم
import { Product, ProductsModel } from "../../models/products.model";
import { Order } from "../../models/orders.model";
import { shoppingCartsModel } from "../../models/shopping.carts.model";
import { User, UsersModel } from "../../models/users.model";
import supertest from "supertest";
import app from "../../server";
import config from "../../config";
import jwt from "jsonwebtoken";
const product: Product = {
   product_name: "test",
   price: 2000,
   id: "",
};
const order: Order = {
   id: "",
   order_status: "",
   user_id: "",
};
const user: User = {
   username: "orderApiUser",
   email: "orderApiUser@gmail.com",
   first_name: "product",
   last_name: "user",
   shipping_address: "address",
   password: "123",
};
const productsMethods = new ProductsModel();
let newProduct = product;
let token: string;
describe(">>>>>> Test Orders  Api <<<<<<", async () => {
   beforeAll(async () => {
      const userMethods = new UsersModel();
      const newUser = await userMethods.create(user);
      newProduct = (await productsMethods.create(product)) as Product;
      product.id = newProduct.id;
      user.id = newUser?.id as string;
      token = jwt.sign({ user }, config.tokenSecret as string);
   });
   it("[post]/users/:user_id/orders Create Order toEqual 401 without Authorization", async () => {
      const response = await supertest(app)
         .post(`/users/${user.id}/orders`)
         .send(user);
      expect(response.status).toEqual(401);
   });
   it("[post]/users/:user_id/orders Create Order toEqual 200 with Authorization", async () => {
      const response = await supertest(app)
         .post(`/users/${user.id}/orders`)
         .send(user)
         .auth(token, { type: "bearer" });
      order.id = response.body.data.order["id"];
      expect(response.status).toEqual(200);
   });
   it("[get]/users/:user_id/orders/:order_id Select Order toEqual 401 without Authorization ", async () => {
      const response = await supertest(app).get(
         `/users/${user.id}/orders/${order.id}`
      );
      expect(response.status).toEqual(401);
   });
   it("[get]/users/:user_id/orders/:order_id Select Order toEqual 200 with Authorization", async () => {
      const response = await supertest(app)
         .get(`/users/${user.id}/orders/${order.id}`)
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(200);
   });
   it("[post]/users/:user_id/orders/:order_id AddToCart toEqual 400 with invalid  inputs ", async () => {
      const response = await supertest(app)
         .post(`/users/${user.id}/orders/${order.id}`)
         .send(["1", 3])
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(400);
   });
   it("[post]/users/:user_id/orders/:order_id AddToCart toEqual 200 with valid  inputs ", async () => {
      const response = await supertest(app)
         .post(`/users/${user.id}/orders/${order.id}`)
         .send({ product_id: product.id, quantity: 4 })
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(200);
   });
   it("[patch]/users/:user_id/orders/:order_id updateCart toEqual 401 without authorization ", async () => {
      const response = await supertest(app)
         .patch(`/users/${user.id}/orders/${order.id}`)
         .send({ product_id: product.id, quantity: 4 });
      expect(response.status).toEqual(401);
   });
   it("[patch]/users/:user_id/orders/:order_id updateCart toEqual 200 with  authorization ", async () => {
      const response = await supertest(app)
         .post(`/users/${user.id}/orders/${order.id}`)
         .send({ product_id: product.id, quantity: 4 })
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(200);
   });
   it("[delete]/users/:user_id/orders/:order_id deleteFromCart toEqual 400 with an invalid product_id ", async () => {
      const response = await supertest(app)
         .delete(`/users/${user.id}/orders/${order.id}`)
         .send({ product_id: "2", quantity: 4 })
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(400);
   });
   it("[delete]/users/:user_id/orders/:order_id deleteFromCart toEqual 200 with a valid product_id ", async () => {
      const shoppingCartsMethods = new shoppingCartsModel();
      const listNo = await shoppingCartsMethods.listNo(
         order.id as string
      );
      const newProduct = await productsMethods.create(product);
      await shoppingCartsMethods.addToCart(
         listNo as number,
         4,
         order.id as string,
         newProduct?.id as string
      );
      const product_id = newProduct?.id;
      const response = await supertest(app)
         .delete(`/users/${user.id}/orders/${order.id}`)
         .send({ product_id: product_id })
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(200);
   });
   it("[get]/users/:user_id/orders/:order_id/products viewOrderProducts toEqual 200 ", async () => {
      const response = await supertest(app)
         .get(`/users/${user.id}/orders/${order.id}/products`)
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(200);
   });
   it("[post]/users/:user_id/orders/:order_id/complete complete toEqual 401 without login Confirmation ", async () => {
      const response = await supertest(app)
         .post(`/users/${user.id}/orders/${order.id}/complete`)
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(401);
   });
   it("[post]/users/:user_id/orders/:order_id/complete  complete.message toMatch  Order Completed Thanx for purchasing with login Confirmation ", async () => {
      const response = await supertest(app)
         .post(`/users/${user.id}/orders/${order.id}/complete`)
         .send({ username: user.username, password: user.password })
         .auth(token, { type: "bearer" });
      expect(response.body.message).toMatch(
         "Order Completed Thanx for purchasing"
      );
   });
});
