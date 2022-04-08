import { Router, Response, Request } from "express";
import * as productController from "../controllers/products.controller";
import { authorizationMiddleWare } from "../middlewares/auth.methods";
import { productsInputValidations } from "../middlewares/products.inputs.validations";
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
   .get(productController.selectProduct)
   .delete(authorizationMiddleWare, productController.deleteProduct)
   .patch(
      authorizationMiddleWare,
      productsInputValidations,
      productController.updateProduct
   );
productRoute.use((_req: Request, res: Response): void => {
   res.status(404).send({
      subject: "Error",
      message: "Something went wrong",
      at: "Products",
   });
});
export default productRoute;
