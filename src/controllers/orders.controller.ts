import { NextFunction, Request, Response } from "express";
import { OrdersModel } from "../models/orders.model";

const order = new OrdersModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
) => {
  try {
    const orderId: string = req.params.orderId;
    const userId: string = req.params.userId;
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
        message: "Couldn't Select a product",
      });
    }
  } catch (error) {
    next();
  }
};
export const selectAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.id;
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
export const deleteFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    const { productOrderId } = req.body;
    const resault = await order.deleteFromCart(productOrderId, orderId);
    if (resault) {
      res.json({
        status: "Succeded",
        message: "product has been deleted from cart",
        data: resault,
      });
    } else {
      res.status(400).json({
        status: "Faild",
        message: "Couldn't delete Product from Cart",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id, quantity } = req.body;
    const orderId = req.params.order_id;
    const update = await order.addToCart(quantity, orderId, product_id);

    if (update) {
      res.json({
        status: "Succeded",
        message: "product in cart has been Updated",
        data: { product: update },
      });
    } else {
      res
        .status(400)
        .json({ status: "Faild", message: "Couldn't update product in cart" });
    }
  } catch (error) {
    next(error);
  }
};
export const orderProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId: string = req.params.order_id;
    const selectedOrder = await order.orderProducts(orderId);
    if (selectedOrder) {
      res.json({
        status: "Success",
        message: "Selected an Order product",
        data: { order: selectedOrder },
      });
    } else {
      res.status(400).json({
        status: "Faild",
        message: "Couldn't retrive the Order products",
      });
    }
  } catch (error) {
    next(error);
  }
};
