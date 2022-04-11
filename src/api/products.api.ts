import { Router } from "express";
import * as productController from "../controllers/products.controller";
import { authorizationMiddleWare } from "../middlewares/auth.methods";
import { productsInputValidations } from "../middlewares/products.inputs.validations";
import { productIdChecker } from "../middlewares/id.checker";
const productRoute = Router();
productRoute
   .route("/products")
   .post(
      authorizationMiddleWare,
      productsInputValidations,
      productController.create
   )
   .get(productController.selectAll);
productRoute
   .route("/products/:id")
   .get(productIdChecker, productController.selectProduct)
   .delete(
      authorizationMiddleWare,
      productIdChecker,
      productController.deleteProduct
   )
   .patch(
      authorizationMiddleWare,
      productIdChecker,
      productsInputValidations,
      productController.updateProduct
   );

export default productRoute;
