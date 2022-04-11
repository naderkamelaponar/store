// بسم الله الرحمن الرحيم
import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/users.model";
import config from "../../config";
import jwt from "jsonwebtoken";
const token = (u: User): string => {
   return jwt.sign({ user: u }, config.tokenSecret as string);
};
describe(">>>>>> Test the User Router <<<<<<", async () => {
   const user: User = {
      username: "",
      email: "",
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
   it("Create another User data.id not.toBe Null  ", async () => {
      user.email = "newuser@gmail.com";
      user.username = "newusername";
      const response = await supertest(app)
         .post("/users/")
         .send(user);
      user.id = response.body.data.user.id;
      expect(response.body.data.user.id).not.toBe(null);
   });

   it("Token not to be null", async () => {
      const login = {
         email: "user@gmail.com",
         password: "123",
      };
      const response = await supertest(app)
         .post("/users/login")
         .send(login);

      expect(response.body.data.token).not.toBe(null);
   });
   it("Select All toEqual 200", async () => {
      const response = await supertest(app).get("/users/");
      expect(response.status).toEqual(200);
   });
   it("Select Not Exists User response.statuse toEqual 400", async () => {
      const response = await supertest(app)
         .get("/users/a")
         .auth(token(user), { type: "bearer" });
      expect(response.status).toEqual(400);
   });
   it("Select User without Authorization response.statuse toEqual 401", async () => {
      const response = await supertest(app).get("/users/" + user.id);
      expect(response.status).toEqual(401);
   });
   it("Select Exists User response.statuse toEqual 200", async () => {
      const response = await supertest(app)
         .get("/users/" + user.id)
         .auth(token(user), { type: "bearer" });
      expect(response.status).toEqual(200);
   });
   it("Update User message toEqual User has been Updated", async () => {
      user.username = "updateduser";
      const response = await supertest(app)
         .patch("/users/" + user.id)
         .send(user)
         .auth(token(user), { type: "bearer" });
      expect(response.body.message).toEqual("User has been Updated");
   });
   it("Delete User without login credintals  response.statuse toEqual 401", async () => {
      const response = await supertest(app)
         .delete("/users/" + user.id)
         .auth(token(user), { type: "bearer" });
      expect(response.status).toEqual(401);
   });
   it("Delete User status toEqual Succeded", async () => {
      const login = {
         email: "user@gmail.com",
         password: "123",
      };
      const response = await supertest(app)
         .delete("/users/" + user.id)
         .send(login)
         .auth(token(user), { type: "bearer" });
      expect(response.body.status).toEqual("Succeded");
   });
});
