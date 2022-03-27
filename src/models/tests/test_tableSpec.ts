import { testTableStore } from "../test_table";
const store = new testTableStore();
describe("Test Table Store", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should return an array", async () => {
    const resault = await store.index();
    expect(resault).toEqual([]);
  });
});
