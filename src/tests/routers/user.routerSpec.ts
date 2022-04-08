// بسم الله الرحمن الرحيم
import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/users.model";
describe(">>>>>> Test the User Router <<<<<<", async () => {
   const user: User = {
      username: "test",
      email: "test@gmail.com",
      first_name: "test",
      last_name: "test",
      mobile_phone: "test",
      shipping_address: "test test",
      password: "123",
      id: "",
   };
   it("Create User toEqual 400 without a username", async () => {
      user.username = "";
      const response = await supertest(app)
         .post("/users/")
         .send(user);
      expect(response.status).toEqual(400);
   });
   it("Create User toEqual 400 without an email", async () => {
      user.email = "";
      const response = await supertest(app)
         .post("/users/")
         .send(user);
      expect(response.status).toEqual(400);
   });
   it("Create User toEqual 200  ", async () => {
      user.email = "user@gmail.com";
      user.username = "username";
      const response = await supertest(app)
         .post("/users/")
         .send(user);
      expect(response.status).toEqual(200);
   });
   it("Show.state toEqual 200", async () => {
      const response = await supertest(app).get("/users/");
      expect(response.status).toEqual(200);
   });
   it("login with username .state toEqual 200", async () => {
      const login = { username: "test", password: "123" };
      const response = await supertest(app)
         .post("/users/login")
         .set(login);
      expect(response.status).toEqual(200);
   });
   it("Token not to be null", async () => {
      const login = {
         email: "test@gmail.com",
         password: "123",
      };
      const response = await supertest(app)
         .post("/users/login")
         .set(login);
      expect(response.body.data.token).not.toBe(null);
   });
});
