// بسم الله الرحمن الرحيم
import express from "express";
import userRoute from "./users.api";
import productRoute from "./products.api";
import orderRouter from "./orders.api";
export const routers: express.Router = express.Router();
const start = "بسم الله الرحمن الرحيم";
routers.get(
   "/",
   (_req: express.Request, res: express.Response): void => {
      res.json({
         start,
         message: "Welcome to My Store",
         yours: "Nader Kamel",
      });
   }
);
routers.use(userRoute);
routers.use(productRoute);
routers.use(orderRouter);
