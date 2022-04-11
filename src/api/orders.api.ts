import { Router } from "express";
import * as ordersController from "../controllers/orders.controller";
import { authorizationMiddleWare } from "../middlewares/auth.methods";
import * as idsChecker from "../middlewares/id.checker";
import * as cartController from "../controllers/shopping.carts.cotroller";
import { cartsInputsValidation } from "../middlewares/carts.inputs.validations";
import { confirmation } from "../controllers/users.controller";
const orderRouter = Router();
orderRouter.use(authorizationMiddleWare, idsChecker.userIdChecker);
orderRouter
   .route("/users/:user_id/orders")
   .post(ordersController.create)
   .get(ordersController.selectAll);
orderRouter
   .route("/users/:user_id/orders/:order_id")
   .get(idsChecker.orderIdChecker, ordersController.selectOrder)
   .post(
      idsChecker.orderIdChecker,
      cartsInputsValidation,
      cartController.addToCart
   )
   .patch(
      idsChecker.orderIdChecker,
      cartsInputsValidation,
      cartController.updateCart
   )
   .delete(idsChecker.orderIdChecker, cartController.deleteFromCart);
orderRouter
   .route("/users/:user_id/orders/:order_id/products")
   .get(idsChecker.orderIdChecker, cartController.showAllProducts);
orderRouter
   .route("/users/:user_id/orders/:order_id/checkout")
   .post(
      idsChecker.orderIdChecker,
      confirmation,
      ordersController.completeOrder
   );
export default orderRouter;
