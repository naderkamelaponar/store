import express, { Request, Response } from "express";
import userRoute from "./api/users.api";
import productRoute from "./api/products.api";
import orderRouter from "./api/orders.api";
import morgan from "morgan";
import cors from "cors";
const app: express.Application = express();
const address = "0.0.0.0:3000";
const corsOption = {
   origin: address,
   optionsSuccessStatus: 200,
};
app.use(morgan("common"));
app.use(cors(corsOption));
app.use(express.json());
app.use(productRoute);
app.use(userRoute);
app.use(orderRouter);
const start = "بسم الله الرحمن الرحيم";
app.get("/", function (req: Request, res: Response): void {
   res.send(start);
});
app.use((_req: Request, res: Response): void => {
   res.status(404).send({
      subject: "Error",
      message: "Something went wrong",
      at: "Home",
   });
});
app.listen(3000, function () {
   console.warn(`starting app on: ${address}`);
});
export default app;
