import { Router } from "express";
import { authorizationMiddleWare } from "../middlewares/auth.methods";
import { usersInputValidations } from "../middlewares/users.inputs.validations";
import { userIdChecker } from "../middlewares/id.checker";
import * as userController from "../controllers/users.controller";
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
   .patch(
      authorizationMiddleWare,
      userIdChecker,
      usersInputValidations,
      userController.updateUser
   )
   .delete(
      authorizationMiddleWare,
      userIdChecker,
      userController.confirmation,
      userController.deleteUser
   );
userRoute.route("/users/login").post(userController.authinticate);
export default userRoute;
