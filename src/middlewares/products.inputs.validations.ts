// بسم الله الرحمن الرحيم
import { Request, Response, NextFunction } from "express";
import { ProductsModel } from "../models/products.model";
export const productsInputValidations = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | unknown> => {
   const productModel = new ProductsModel();
   const { quantity, product_id, id, product_name, price } = req.body;
   const pattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
   if (product_id && pattern.test(product_id)) {
      if (!productModel.idExists(product_id)) {
         return res
            .status(400)
            .json({ message: "Product Not Found" });
      }
      if (
         quantity === undefined ||
         quantity === "" ||
         quantity === 0
      ) {
         return res.status(400).json({
            message: "You Must Input a valid Quantity Number",
         });
      }
      return next();
   }
   if (id && pattern.test(id)) {
      if (!productModel.idExists(id)) {
         return res
            .status(400)
            .json({ message: "Product Not Found" });
      }
   }
   const resJson = { status: "FAILD", message: "" };
   if (product_name === undefined || product_name === "") {
      resJson.message = "Product Name  is required";
      return res.status(400).json(resJson);
   }
   if (price === undefined || price === "" || price === 0) {
      resJson.message = "Price is required";
      return res.status(400).json(resJson);
   }

   next();
};
