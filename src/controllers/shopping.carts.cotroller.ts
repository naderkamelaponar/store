// بسم الله الرحمن الرحيم
import { NextFunction, Request, Response } from "express";
import { shoppingCartsModel } from "../models/shopping.carts.model";

const cart = new shoppingCartsModel();

export const deleteFromCart = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const orderId = req.url.split("/")[4];
      const productId = req.body["product_id"];
      const resault = await cart.deleteFromCart(productId, orderId);
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
): Promise<void> => {
   try {
      const { product_id, quantity } = req.body;
      const orderId = req.params.order_id;
      const isExists = await cart.isExists(orderId, product_id);

      if (isExists) {
         res.json({
            status: "Succeded",
            message: "product is already exists in cart",
            data: { product: isExists },
         });
         return;
      }
      const listNo = await cart.listNo(orderId);
      const newProduct = await cart.addToCart(
         listNo,
         quantity,
         orderId,
         product_id
      );

      if (newProduct) {
         res.json({
            status: "Succeded",
            message: "product has been added to cart",
            data: { product: newProduct },
         });
      } else {
         res.status(400).json({
            status: "Faild",
            message: "Couldn't add a product in cart",
         });
      }
   } catch (error) {
      next(error);
   }
};
export const updateCart = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const { product_id, quantity } = req.body;
      const orderId = req.params.order_id;
      const update = await cart.updateCart(
         quantity,
         orderId,
         product_id
      );

      if (update) {
         res.json({
            status: "Succeded",
            message: "product has been updated to cart",
            data: { product: update },
         });
      } else {
         res.status(400).json({
            status: "Faild",
            message: "Couldn't updated a product in cart",
         });
      }
   } catch (error) {
      next(error);
   }
};
export const showAllProducts = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const orderId: string = req.params.order_id;
      const selectedOrder = await cart.orderProducts(orderId);
      if (selectedOrder) {
         res.json({
            status: "Success",
            message: "Selected  cart products",
            data: { order: selectedOrder },
         });
      } else {
         res.status(400).json({
            status: "Faild",
            message: "Couldn't select cart products",
         });
      }
   } catch (error) {
      next(error);
   }
};
