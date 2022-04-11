// بسم الله الرحمن الرحيم
import { Product } from "../../models/products.model";
import { User } from "../../models/users.model";
import supertest from "supertest";
import app from "../../server";
const product: Product = {
   product_name: "test",
   price: 2000,
   id: "",
};

const user: User = {
   username: "productUser",
   email: "productuser@gmail.com",
   first_name: "product",
   last_name: "user",
   shipping_address: "address",
   password: "123",
};
let token: string;
describe(">>>>>> Test the Products Api <<<<<<", async () => {
   it("/products/ Create product toEqual 401 without Authorization", async () => {
      const response = await supertest(app)
         .post("/products/")
         .send(product);
      expect(response.status).toEqual(401);
   });
   it("/products/ Create Product toEqual 200 with Authorization ", async () => {
      const data = await supertest(app).post("/users/").send(user);
      token = data.body.data.token as string;
      const response = await supertest(app)
         .post("/products/")
         .send(product)
         .auth(token, { type: "bearer" });
      product.id = response.body.data["product"]["id"];
      expect(response.status).toEqual(200);
   });
   it("/products/ Select All Products the returned status to Equal Succeded", async () => {
      const response = await supertest(app)
         .get("/products/")
         .send(product);
      expect(response.body.status).toEqual("Succeded");
   });
   it("/products/:id Select a Product the returned message toBe Selected a product", async () => {
      const response = await supertest(app)
         .get(`/products/${product.id}`)
         .auth(token, { type: "bearer" });
      expect(response.body.message).toBe("Selected a product");
   });
   it("/products/:id Update a Product the returned price toBe 1800", async () => {
      product.price = 1800;
      const response = await supertest(app)
         .patch(`/products/${product.id}`)
         .send(product)
         .auth(token, { type: "bearer" });
      expect(response.body.data["product"]["price"]).toBe(1800);
   });
   it("/products/:id Delete a Product response.status toEqual 200", async () => {
      product.price = 1800;
      const response = await supertest(app)
         .patch(`/products/${product.id}`)
         .send(product)
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(200);
   });
});
