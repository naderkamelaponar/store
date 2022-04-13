// بسم الله الرحمن الرحيم
import supertest from "supertest";
import app from "../server";
describe(">>>>>> Test Server <<<<<<", async () => {
   it("[GET] / expected response.body.start toBe `Welcome to My Store`", async () => {
      const response = await supertest(app).get("/");
      expect(response.body.message).toBe("Welcome to My Store");
   });
});
