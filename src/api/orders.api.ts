import { Router, Response, Request } from "express";
import * as ordersController from "../controllers/orders.controller";
import { authorizationMiddleWare } from "../middlewares/auth.methods";
const orderRouter = Router();
orderRouter.use(authorizationMiddleWare);
orderRouter
   .route("/users/:user_id/orders")
   .post(ordersController.create)
   .get(ordersController.selectAll);
orderRouter
   .route("/users/:user_id/orders/:order_id")
   .get(ordersController.selectOrder)
   .post(ordersController.addToCart)
   .delete(ordersController.deleteFromCart);
orderRouter
   .route("/users/:user_id/orders/:order_id/products")
   .get(ordersController.orderProducts);
orderRouter.use((_req: Request, res: Response): void => {
   res.status(404).send({
      subject: "Error",
      message: "Something went wrong",
      at: "Orders",
   });
});
export default orderRouter;
