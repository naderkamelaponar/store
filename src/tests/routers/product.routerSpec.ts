// بسم الله الرحمن الرحيم
import supertest from "supertest";
import app from "../../server";
import { Product } from "../../models/products.model";
import { User } from "../../models/users.model";
//import { create } from "../../controllers/users.controller";
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
describe(">>>>>> Test the Products Router <<<<<<", async () => {
   it("Create product toEqual 401 without Authorization", async () => {
      const response = await supertest(app)
         .post("/products/")
         .send(product);
      expect(response.status).toEqual(401);
   });
   it("Create Product toEqual 200 with Authorization ", async () => {
      const data = await supertest(app).post("/users/").send(user);
      token = data.body.data.token;
      const response = await supertest(app)
         .post("/products/")
         .send(product)
         .auth(token, { type: "bearer" });
      product.id = response.body.data["product"]["id"];
      expect(response.status).toEqual(200);
   });
   it("Select All Products the returned status to Equal Succeded", async () => {
      const response = await supertest(app)
         .get("/products/")
         .send(product);
      expect(response.body.status).toEqual("Succeded");
   });
   it("Select a Product the returned message toBe Selected a product", async () => {
      const response = await supertest(app)
         .get("/products/" + product.id)
         .auth(token, { type: "bearer" });
      expect(response.body.message).toBe("Selected a product");
   });
   it("Update a Product the returned price toBe 1800", async () => {
      product.price = 1800;
      const response = await supertest(app)
         .patch("/products/" + product.id)
         .send(product)
         .auth(token, { type: "bearer" });
      expect(response.body.data["product"]["price"]).toBe(1800);
   });
   it("Delete a Product response.status toEqual 200", async () => {
      product.price = 1800;
      const response = await supertest(app)
         .patch("/products/" + product.id)
         .send(product)
         .auth(token, { type: "bearer" });
      expect(response.status).toEqual(200);
   });
});
