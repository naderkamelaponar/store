import { Router, Response, Request } from "express";
import * as userController from "../controllers/users.controller";
import { authorizationMiddleWare } from "../middlewares/auth.methods";
import { usersInputValidations } from "../middlewares/users.inputs.validations";
const userRoute = Router();
userRoute
   .route("/users")
   .post(usersInputValidations, userController.create)
   .get(userController.selectAll);
userRoute
   .route("/users/:id")
   .get(authorizationMiddleWare, userController.selectUser)
   .delete(authorizationMiddleWare, userController.deleteUser)
   .patch(
      authorizationMiddleWare,
      usersInputValidations,
      userController.updateUser
   );
userRoute.route("/users/login").post(userController.authinticate);
userRoute.use((_req: Request, res: Response): void => {
   res.status(404).send({
      subject: "Error",
      message: "Something went wrong",
      at: "Users",
   });
});
export default userRoute;
