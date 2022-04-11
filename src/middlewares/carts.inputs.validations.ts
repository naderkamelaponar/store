// بسم الله الرحمن الرحيم
import { Request, Response, NextFunction } from "express";
import { ProductsModel } from "../models/products.model";
import { OrdersModel } from "../models/orders.model";
export const cartsInputsValidation = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | unknown> => {
   const order = new OrdersModel();
   const isActive = await order.isActive(req.params.user_id);
   const resJson = { status: "FAILD", message: "" };
   if (!isActive) {
      resJson.message = "Order is Completed";
      return res.status(400).json(resJson);
   }
   const { product_id, quantity } = req.body;
   const product = new ProductsModel();
   const productIdExists = await product.idExists(product_id);
   if (!productIdExists || product_id === undefined) {
      resJson.message = "Product Not Found";
      return res.status(400).json(resJson);
   }
   if (req.method === "DELETE") {
      return next();
   }
   if (quantity === undefined || quantity === "" || quantity === 0) {
      resJson.message = "You Must Input a valid Quantity Number";
      return res.status(400).json(resJson);
   }
   next();
};
