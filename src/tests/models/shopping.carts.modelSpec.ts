// بسم الله الرحمن الرحيم
import { UsersModel, User } from "../../models/users.model";
import { OrdersModel, Order } from "../../models/orders.model";
import { ProductsModel, Product } from "../../models/products.model";
import { shoppingCartsModel } from "../../models/shopping.carts.model";
const user: User = {
   username: "cartuser",
   email: "cartuser@email.com",
   first_name: "nader",
   last_name: "kamel",
   mobile_phone: "01100390905",
   shipping_address: "Alexandria Egypt",
   password: "password1234",
};
const order: Order = {
   order_status: "",
   user_id: "",
};
const product: Product = {
   product_name: "BRIDGESTONE",
   price: 1200,
};
const ordersMethods = new OrdersModel();
const usersMethods = new UsersModel();
const productsMethods = new ProductsModel();
const shoppingCartsMethods = new shoppingCartsModel();
describe(">>>>>> Test The ShoppingCartsModel Model <<<<<<", () => {
   beforeAll(async () => {
      const newUser = await usersMethods.create(user);
      const newProduct = await productsMethods.create(product);
      const newOrder = await ordersMethods.newOrder(
         user.id as string
      );
      user.id = newUser?.id;
      product.id = newProduct?.id;
      order.id = newOrder?.id;
   });
   describe("Test the addToCart Method", () => {
      it("Should have a addToCart method", () => {
         expect(shoppingCartsMethods.addToCart).toBeDefined();
      });
      it("Should addToCart a product", async () => {
         const listNo = (await shoppingCartsMethods.listNo(
            order.id as string
         )) as number;
         const productToCart = await shoppingCartsMethods.addToCart(
            listNo,
            10,
            order.id as string,
            product.id as string
         );
         expect(productToCart?.list_no).toEqual(1);
      });
   });
   describe("Test the isExists Method", () => {
      it("Should have a isExists method", () => {
         expect(shoppingCartsMethods.isExists).toBeDefined();
      });
      it("Should isExists list_no toEqual 1", async () => {
         const productToCart = await shoppingCartsMethods.isExists(
            order.id as string,
            product.id as string
         );
         expect(productToCart?.list_no).toEqual(1);
      });
   });
   describe("Test the updateCart Method", () => {
      it("Should have a updateCart method", () => {
         expect(shoppingCartsMethods.updateCart).toBeDefined();
      });
      it("Should updateCart quantity toEqual 2", async () => {
         const updateProduct = await shoppingCartsMethods.updateCart(
            2,
            order.id as string,
            product.id as string
         );
         expect(updateProduct?.quantity).toEqual(2);
      });
   });
   describe("Test the deleteFromCart Method", () => {
      it("Should have a deleteFromCart method", () => {
         expect(shoppingCartsMethods.deleteFromCart).toBeDefined();
      });
      it("Should deleteFromCart quantity toEqual 2", async () => {
         let addProduct = await productsMethods.create(product);
         const productToDelete = addProduct?.id as string;
         let listNo = await shoppingCartsMethods.listNo(
            order.id as string
         );
         //#2
         let addToCart = await shoppingCartsMethods.addToCart(
            listNo,
            2,
            order.id as string,
            productToDelete
         );
         addProduct = await productsMethods.create(product);
         listNo = await shoppingCartsMethods.listNo(
            order.id as string
         );
         //#3
         addToCart = await shoppingCartsMethods.addToCart(
            listNo,
            2,
            order.id as string,
            addProduct?.id as string
         );
         const deleteFromCart =
            await shoppingCartsMethods.deleteFromCart(
               productToDelete,
               order.id as string
            );
         expect(deleteFromCart?.list_no).toEqual(
            (addToCart?.list_no as number) - 1
         );
      });
   });
   describe("Test the listNo Method", () => {
      it("Should have a listNo method", () => {
         expect(shoppingCartsMethods.listNo).toBeDefined();
      });
      it("Should listNo toBe 3", async () => {
         const listNo = await shoppingCartsMethods.listNo(
            order.id as string
         );
         expect(listNo).toBe(3);
      });
   });
   describe("Test the orderProducts Method", () => {
      it("Should have a orderProducts method", () => {
         expect(shoppingCartsMethods.orderProducts).toBeDefined();
      });
      it("Should orderProducts length toEqual 2", async () => {
         const orderProducts =
            await shoppingCartsMethods.orderProducts(
               order.id as string
            );
         expect(orderProducts?.length).toBe(2);
      });
   });
});
