import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../models/products.model";

const product = new ProductModel();

export const create = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const newProduct = await product.create(req.body);
      if (newProduct) {
         res.json({
            status: "Success",
            message: "New Product has been created",
            data: { product: newProduct },
         });
      } else {
         res.status(400).json({
            status: "Faild",
            message: "Couldn't create a new product",
         });
      }
   } catch (error) {
      next(error);
   }
};
export const selectProduct = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const productId: string = req.params.id;
      const selctedProdcut = await product.selectProduct(productId);
      if (selctedProdcut) {
         res.json({
            status: "Success",
            message: "Selected a product",
            data: { product: selctedProdcut },
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
): Promise<void> => {
   try {
      const products = await product.selectAll();
      if (products) {
         res.json({
            status: "Succeded",
            message: "Selected All products",
            data: { products: { ...products } },
         });
      } else {
         res.status(400).send({
            status: "Faild",
            message: "Couldn't Select All Products",
         });
      }
   } catch (error) {
      next(error);
   }
};
export const deleteProduct = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const resault = await product.delete(req.params.id);

      if (resault) {
         res.json({
            status: "Succeded",
            message: "product has been deleted",
            data: { product: resault },
         });
      } else {
         res.status(400).json({
            status: "Faild",
            message: "Couldn't Delete a product",
         });
      }
   } catch (error) {
      next(error);
   }
};
export const updateProduct = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void> => {
   try {
      const update = await product.updateProduct(req.body);

      if (update) {
         res.json({
            status: "Succeded",
            message: "product has been Updated",
            data: { product: update },
         });
      } else {
         res.status(400).json({
            status: "Faild",
            message: "Couldn't Update a product",
         });
      }
   } catch (error) {
      next(error);
   }
};
