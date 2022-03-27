import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(bodyParser.json());
const start = "بسم الله الرحمن الرحيم";
app.get("/", function (req: Request, res: Response) {
  res.send(start);
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
