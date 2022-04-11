// بسم الله الرحمن الرحيم
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
export const authorizationMiddleWare = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const authHeader = req.get("authorization");
      if (authHeader) {
         const token = authHeader.split(" ")[1];
         const decode = jwt.verify(
            token,
            config.tokenSecret as string
         );
         // const tokenId = JSON.parse(JSON.stringify(decode))["user"]["id"];
         //const senderId = req.params.id;

         if (decode) {
            //&& tokenId === senderId) {
            next();
         } else {
            res.status(401).json({
               error: "Unable to Authorize the user",
            });
         }
      } else {
         res.status(401).json({
            error: "Unable to Authorize the user",
         });
      }
      return;
   } catch (error) {
      res.status(401).json({
         error: "Unable to Authorize the user",
      });
   }
};
