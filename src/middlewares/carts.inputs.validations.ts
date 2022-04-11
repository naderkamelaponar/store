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
   const isActive = await order.isActive(req.params.order_id);
   const resJson = { status: "FAILD", message: "" };
   if (!isActive) {
      resJson.message = "Order is Completed";
      return res.status(400).json(resJson);
   }
   const { product_id, quantity } = req.body;
   const product = new ProductsModel();
   if (!product.idExists(product_id)) {
      resJson.message = "Product Not Found";
      return res.status(400).json(resJson);
   }
   if (quantity === undefined || quantity === "" || quantity === 0) {
      resJson.message = "You Must Input a valid Quantity Number";
      return res.status(400).json(resJson);
   }
   next();
};
