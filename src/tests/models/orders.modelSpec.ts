// بسم الله الرحمن الرحيم
import { User, UsersModel } from "../../models/users.model";
import { OrdersModel, Order } from "../../models/orders.model";
const order: Order = {
   order_status: "",
   user_id: "",
};
const user: User = {
   username: "orderuser",
   email: "orderuser@email.com",
   first_name: "nader",
   last_name: "kamel",
   mobile_phone: "01100390905",
   shipping_address: "Alexandria Egypt",
   password: "password1234",
};
const ordersMethods = new OrdersModel();
const userModelMethods = new UsersModel();

describe(">>>>>> Test The Orders Model <<<<<<", () => {
   describe("Test the newOrder Method", () => {
      it("Should have a newOrder method", () => {
         expect(ordersMethods.newOrder).toBeDefined();
      });
      it("Should CREATE a newOrder", async () => {
         const newUser = await userModelMethods.create(user);
         user.id = newUser?.id as string;
         const resault = await ordersMethods.newOrder(user.id);
         order.id = resault?.id;
         order.order_status = resault?.order_status as string;
         expect(resault).not.toEqual(null);
      });
      it("Should CREATE a newOrder id toBeEqual to earlier id", async () => {
         const resault = await ordersMethods.newOrder(
            user.id as string
         );
         expect(resault?.id).toBe(order.id);
      });
   });
   describe("Test the idExists Method", () => {
      it("Should have a idExists method", () => {
         expect(userModelMethods.idExists).toBeDefined();
      });
      it("Should idExists return false with invalid id", async () => {
         const resault = await ordersMethods.idExists("s");
         expect(resault).toEqual(false);
      });
      it("Should idExists return true  a valid id", async () => {
         const resault = await ordersMethods.idExists(
            order.id as string
         );
         expect(resault).toEqual(true);
      });
   });
   describe("Test the completeOrder Method", () => {
      it("Should have a completeOrder method", () => {
         expect(ordersMethods.completeOrder).toBeDefined();
      });
      it("Should completeOrder  status toMatch complete", async () => {
         const resault = await ordersMethods.completeOrder(
            order.id as string,
            user.id as string
         );
         expect(resault?.order_status).toMatch("complete");
      });
   });
   describe("Test the isActive Method", () => {
      it("Should have a isActive method", () => {
         expect(ordersMethods.isActive).toBeDefined();
      });
      it("Should isActive  toEqual Null when order_status is complete", async () => {
         const resault = await ordersMethods.isActive(
            user.id as string
         );
         expect(resault).toEqual(null);
      });
      it("Should isActive   order_status toEqual  active", async () => {
         const newOrder = await ordersMethods.newOrder(
            user.id as string
         );
         order.id = newOrder?.id;
         const resault = await ordersMethods.isActive(
            user.id as string
         );
         expect(resault?.order_status).toEqual("active");
      });
   });
   describe("Test the SELECTALL Method", () => {
      it("Should have a SELECTALL method", () => {
         expect(ordersMethods.selectAll).toBeDefined();
      });
      it("Should return 2 rows", async () => {
         const resault = await ordersMethods.selectAll(
            user.id as string
         );
         expect(resault?.length).toBe(2);
      });
   });
   describe("Test the selectOrder Method", () => {
      it("Should have a selectOrder method", () => {
         expect(ordersMethods.selectOrder).toBeDefined();
      });
      it("Should  order_status toBe active", async () => {
         const resault = await ordersMethods.selectOrder(
            order.id as string,
            user.id as string
         );
         expect(resault?.order_status).toBe("active");
      });
   });
});
