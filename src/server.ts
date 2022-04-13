// بسم الله الرحمن الرحيم
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import { routers } from "./api";
//import userRoute from "./api/users.api";
//import productRoute from "./api/products.api";
//import orderRouter from "./api/orders.api";

const app: express.Application = express();
const address = "0.0.0.0:3000";
const PORT = config.port || 3000;
const corsOption = {
   origin: address,
   optionsSuccessStatus: 200,
};
app.use(morgan("common"));
app.use(cors(corsOption));
app.use(express.json());
app.use("/", routers);

app.use("*", (req: Request, res: Response): void => {
   res.status(404).send({
      subject: "Error",
      message: "Something went wrong",
   });
});
app.listen(PORT, (): void => {
   console.warn(`starting app on: ${address}`);
});
export default app;
