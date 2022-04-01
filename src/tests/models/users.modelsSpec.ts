import { User, UserModel } from "../../models/users.model";
const user: User = {
  username: "naderkamel",
  password: "12345",
  first_name: "nader",
  last_name: "kamel",
  email: "email@gmail.com",
};
const userStore = new UserModel();
describe("Test Table Store", () => {
  it("should have  selectAll method", () => {
    expect(userStore.selectAll).toBeDefined();
  });
  it("should create a new user", async () => {
    const resault = await userStore.create(user);
    expect(resault.first_name).toBe(user.first_name);
  });
  it("should return an array", async () => {
    const resault = await userStore.selectAll();
    expect(resault).toEqual([...resault]);
  });
});
