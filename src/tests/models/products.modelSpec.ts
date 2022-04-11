import { Product, ProductsModel } from "../../models/products.model";
const product: Product = {
   product_name: "BRIDGESTONE",
   price: 1200,
};
const productModelMethods = new ProductsModel();

describe("Test The products Model", () => {
   describe("Test the CREATE Method", () => {
      it("Should have a CREATE method", () => {
         expect(productModelMethods.create).toBeDefined();
      });
      it("Should CREATE a new product", async () => {
         const resault = await productModelMethods.create(product);
         product.id = resault?.id as string;
         expect(resault).not.toEqual(null);
      });
   });
   describe("Test the SELECTPRODUCT Method", () => {
      it("Should have a SELECTPRODUCT method", () => {
         expect(productModelMethods.selectProduct).toBeDefined();
      });
      it("Should SELECTPRODUCT by id", async () => {
         const resault = await productModelMethods.selectProduct(
            product.id as string
         );
         expect(resault?.product_name).toBe(product.product_name);
      });
   });
   describe("Test the UPDATE Method", () => {
      it("Should have an UPDATE method", () => {
         expect(productModelMethods.updateProduct).toBeDefined();
      });
      it("Should UPDATE product", async () => {
         product.product_name = "BRIDGESTONE 175/70R13";
         const resault = await productModelMethods.updateProduct(
            product
         );
         expect(resault?.product_name).toEqual(product.product_name);
      });
   });
   describe("Test the SELECTALL Method", () => {
      it("Should have a SELECTALL method", () => {
         expect(productModelMethods.selectAll).toBeDefined();
      });
      it("Should SELECTALL products", async () => {
         const resault = await productModelMethods.selectAll();
         expect(resault?.length).toBe(1);
      });
   });
   describe("Test the DELETE Method", () => {
      it("Should have a DELETE method", () => {
         expect(productModelMethods.delete).toBeDefined();
      });
      it("Should DELETE by id", async () => {
         const resault = await productModelMethods.delete(
            product.id as string
         );
         expect(resault?.id).toEqual(product.id);
      });
   });
});
