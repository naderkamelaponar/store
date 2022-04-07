import { User, UserModel } from "../../models/users.model";
const user: User = {
  username: "naderkamel",
  email: "nader.kamel.the.programmer@gmail.com",
  firstName: "nader",
  lastName: "kamel",
  mobilePhone: "01100390905",
  shippingAddress: "Alexandria Egypt",
  password: "password1234",
};
const userModelMethods = new UserModel();

describe("Test The Users Model", () => {
  describe("Test the CREATE Method", () => {
    it("Should have a CREATE method", () => {
      expect(userModelMethods.create).toBeDefined();
    });
    it("Should CREATE a new user", async () => {
      const resault = await userModelMethods.create(user);
      user.id = resault?.id as string;
      expect(resault).not.toEqual(null);
    });
    it("Should Not CREATE a new user with a Taken username", async () => {
      const resault = await userModelMethods.create(user);
      expect(resault).toBe(null);
    });
    it("Should Not CREATE a new user with a Taken email", async () => {
      const resault = await userModelMethods.create(user);
      expect(resault).toBe(null);
    });
  });
  describe("Test the LOGIN Method", () => {
    it("Should have a LOGIN method", () => {
      expect(userModelMethods.login).toBeDefined();
    });
    it("Should LOGIN a user with the username", async () => {
      const resault = await userModelMethods.login(
        user.username,
        user.password,
        "username"
      );
      expect(resault?.id).toEqual(user.id);
    });
    it("Should LOGIN a user with the email", async () => {
      const resault = await userModelMethods.login(
        user.email,
        user.password,
        "email"
      );
      expect(resault?.id).toEqual(user.id);
    });
  });
  describe("Test the SELECTUSER Method", () => {
    it("Should have a SELECTUSER method", () => {
      expect(userModelMethods.selectUser).toBeDefined();
    });
    it("Should SELECTUSER by id", async () => {
      const resault = await userModelMethods.selectUser(user.id as string);
      expect(resault?.username).toBe(user.username);
    });
  });
  describe("Test the UPDATE Method", () => {
    it("Should have an UPDATE method", () => {
      expect(userModelMethods.updateUser).toBeDefined();
    });
    it("Should UPDATE with the same username", async () => {
      const resault = await userModelMethods.updateUser(user);
      expect(resault?.username).toEqual(user.username);
    });
    it("Should UPDATE with the same email", async () => {
      const resault = await userModelMethods.updateUser(user);
      expect(resault?.email).toEqual(user.email);
    });
    it("Should UPDATE with a new username", async () => {
      user.username = "naderaponar";
      const resault = await userModelMethods.updateUser(user);
      expect(resault?.username).toBe(user.username);
    });
    it("Should UPDATE with a new email", async () => {
      user.email = "aponarcorp@outlook.com";
      const resault = await userModelMethods.updateUser(user);
      expect(resault?.email).toBe(user.email);
    });
    it("Should NOT UPDATE with a taken username Or a taken email", async () => {
      const newUser: User = {
        email: "aponarcorp@outlook.com",
        username: "naderaponar",
        firstName: "nader",
        lastName: "kamel",
        mobilePhone: "01100390905",
        password: "1234",
        shippingAddress: "Alexandria Egypt",
      };
      userModelMethods.create(newUser);
      const resault = await userModelMethods.updateUser(newUser);
      expect(resault).toBe(null);
    });
  });
  describe("Test the SELECTALL Method", () => {
    it("Should have a SELECTALL method", () => {
      expect(userModelMethods.selectUser).toBeDefined();
    });
    it("Should SELECTALL users", async () => {
      const resault = await userModelMethods.selectAll();
      expect(resault?.length).toBeGreaterThan(0);
    });
  });
  describe("Test the DELETE Method", () => {
    it("Should have a DELETE method", () => {
      expect(userModelMethods.delete).toBeDefined();
    });
    it("Should DELETE by id", async () => {
      const resault = await userModelMethods.delete(user.id as string);
      expect(resault?.id).toEqual(user.id);
    });
  });
});
