import { NextFunction, Request, Response } from "express";
import { OrdersModel } from "../models/orders.model";

const order = new OrdersModel();

export const create = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const userId: string = req.params.user_id;
      const newOrder = await order.newOrder(userId);
      if (newOrder) {
         res.json({
            status: "Success",
            message: "Created New Order",
            data: { order: newOrder },
         });
      } else {
         res.status(400).json({
            status: "Faild",
            message: "Couldn't create a new Order",
         });
      }
   } catch (error) {
      next(error);
   }
};
export const selectOrder = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const orderId: string = req.params.order_id;
      const userId: string = req.params.user_id;
      const selectedOrder = await order.selectOrder(orderId, userId);
      if (selectedOrder) {
         res.json({
            status: "Success",
            message: "Selected an order",
            data: { order: selectedOrder },
         });
      } else {
         res.status(400).json({
            status: "Faild",
            message: "Couldn't Select an order ",
         });
      }
   } catch (error) {
      next(error);
   }
};
export const selectAll = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const userId: string = req.params.user_id;
      const orders = await order.selectAll(userId);
      if (orders) {
         res.json({
            status: "Succeded",
            message: "Selected All Orders",
            users: { ...orders },
         });
      } else {
         res.status(400).send({
            status: "Faild",
            message: "Couldn't select All Orders",
         });
      }
   } catch (error) {
      next(error);
   }
};
export const completeOrder = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const orderId: string = req.params.order_id;
      const userId: string = req.params.user_id;
      const newOrder = await order.completeOrder(orderId, userId);
      if (newOrder) {
         res.json({
            status: "Success",
            message: "Order Completed Thanx for purchasing",
            data: { order: newOrder },
         });
      } else {
         res.status(400).json({
            status: "Faild",
            message: "Couldn't complete the Order",
         });
      }
   } catch (error) {
      next(error);
   }
};
