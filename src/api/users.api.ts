import { Router } from "express";
import * as userController from "../controllers/users.controller";
import { authorizationMiddleWare } from "../middlewares/auth.methods";
import { usersInputValidations } from "../middlewares/users.inputs.validations";
import { userIdChecker } from "../middlewares/id.checker";
const userRoute = Router();
userRoute
   .route("/users")
   .post(usersInputValidations, userController.create)
   .get(userController.selectAll);
userRoute
   .route("/users/:id")
   .get(
      authorizationMiddleWare,
      userIdChecker,
      userController.selectUser
   )
   .delete(
      authorizationMiddleWare,
      userIdChecker,
      userController.confirmation,
      userController.deleteUser
   )
   .patch(
      authorizationMiddleWare,
      userIdChecker,
      usersInputValidations,
      userController.updateUser
   );
userRoute.route("/users/login").post(userController.authinticate);
export default userRoute;
