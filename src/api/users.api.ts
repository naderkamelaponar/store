import { Router } from "express";
import * as userController from "../controllers/users.controller";
const userRoute = Router();
userRoute
  .route("/user")
  .post(userController.create)
  .get(userController.selectAll);
userRoute
  .route("/user/:id")
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
export default userRoute;
