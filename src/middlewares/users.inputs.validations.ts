// بسم الله الرحمن الرحيم
import { Request, Response, NextFunction } from "express";

export const usersInputValidations = async (
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | unknown> => {
   const {
      email,
      username,
      first_name,
      last_name,
      shipping_address,
      password,
   } = req.body;
   const resJson = { status: "FAILD", message: "" };
   if (email === undefined || email === "") {
      resJson.message = "Email is required";
      return res.status(400).json(resJson);
   }
   if (username === undefined || username === "") {
      resJson.message = "username is required";
      return res.status(400).json(resJson);
   }
   if (first_name === undefined || first_name === "") {
      resJson.message = "First Name is required";
      return res.status(400).json(resJson);
   }
   if (last_name === undefined || last_name === "") {
      resJson.message = "Last Name is required";
      return res.status(400).json(resJson);
   }
   if (shipping_address === undefined || shipping_address === "") {
      resJson.message = "Shipping Address is required";
      return res.status(400).json(resJson);
   }
   if (password === undefined || password === "") {
      resJson.message = "password is required";
      return res.status(400).json(resJson);
   }
   next();
};
