import { Router, Response, Request } from "express";
import * as productController from "../controllers/products.controller";
import { authorizationMiddleWare } from "../middlewares/auth.methods";

const productRoute = Router();
productRoute
  .route("/products")
  .post(productController.create)
  .get(productController.selectAll);
productRoute
  .route("/products/product/:id")
  .get(productController.selectProduct);
productRoute
  .route("/products/product")
  .delete(authorizationMiddleWare, productController.deleteProduct)
  .patch(authorizationMiddleWare, productController.updateProduct);

export default productRoute;
