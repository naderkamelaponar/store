// بسم الله الرحمن الرحيم
import { Request, Response, NextFunction } from "express";
import { UsersModel } from "../models/users.model";
import { ProductsModel } from "../models/products.model";
import { OrdersModel } from "../models/orders.model";

export const userIdChecker = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | unknown> => {
   let userId = "";

   if (req.url.startsWith("/users/")) {
      userId = req.params.id;
   }
   if (req.url.includes("/orders")) {
      userId = req.url.split("/")[2];
   }
   const user = new UsersModel();
   const isExists = await user.idExists(userId);
   if (isExists) {
      next();
   } else {
      return res.status(400).json({ message: "User not found" });
   }
};
export const productIdChecker = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | unknown> => {
   const productId = req.params.id;

   const product = new ProductsModel();
   const isExists = await product.idExists(productId);
   if (isExists) {
      next();
   } else {
      return res.status(400).json({ message: "Product not found" });
   }
};
export const orderIdChecker = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | unknown> => {
   const orderId = req.url.split("/")[4];
   const order = new OrdersModel();
   const isExists = await order.idExists(orderId);
   if (isExists) {
      next();
   } else {
      return res.status(400).json({ message: "Order not found" });
   }
};
