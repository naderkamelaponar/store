// بسم الله الرحمن الرحيم
import { Request, Response, NextFunction } from "express";

export const productsInputValidations = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | unknown> => {
   const { product_name, price } = req.body;
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
