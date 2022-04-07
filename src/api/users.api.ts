import { Router } from "express";
import * as userController from "../controllers/users.controller";
import { authorizationMiddleWare } from "../middlewares/auth.methods";
const userRoute = Router();
userRoute
  .route("/users")
  .post(userController.create)
  .get(userController.selectAll);
userRoute
  .route("/users/user/:id")
  .get(authorizationMiddleWare, userController.selectUser)
  .delete(authorizationMiddleWare, userController.deleteUser)
  .patch(authorizationMiddleWare, userController.updateUser);
userRoute.route("/users/login").post(userController.authinticate);
export default userRoute;
