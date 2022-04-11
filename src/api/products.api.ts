import { Router } from "express";
import { authorizationMiddleWare } from "../middlewares/auth.methods";
import { productsInputValidations } from "../middlewares/products.inputs.validations";
import { productIdChecker } from "../middlewares/id.checker";
import * as productController from "../controllers/products.controller";
const productRoute = Router();
productRoute
   .route("/products")
   .get(productController.selectAll)
   .post(
      authorizationMiddleWare,
      productsInputValidations,
      productController.create
   );
productRoute
   .route("/products/:id")
   .get(productIdChecker, productController.selectProduct)
   .patch(
      authorizationMiddleWare,
      productIdChecker,
      productsInputValidations,
      productController.updateProduct
   )
   .delete(
      authorizationMiddleWare,
      productIdChecker,
      productController.deleteProduct
   );

export default productRoute;
