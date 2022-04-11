// بسم الله الرحمن الرحيم
import { Request, Response, NextFunction } from "express";
import { ProductsModel } from "../models/products.model";
export const productsInputValidations = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | unknown> => {
   const productModel = new ProductsModel();
   const { id, product_name, price } = req.body;
   const isExists = await productModel.idExists(id);
   if (!isExists && req.params.id) {
      return res.status(400).json({ message: "Product Not Found" });
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
