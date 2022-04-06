import express, { Request, Response } from "express";
import userRoute from "./api/users.api";
import productRoute from "./api/products.api";
import orderRouter from "./api/orders.api";
import morgan from "morgan";
const app: express.Application = express();
const address = "0.0.0.0:3000";
app.use(morgan("common"));
app.use(express.json());
const start = "بسم الله الرحمن الرحيم";
app.get("/", function (req: Request, res: Response) {
  res.send(start);
});
app.use(productRoute);
app.use(userRoute);
app.use(orderRouter);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
