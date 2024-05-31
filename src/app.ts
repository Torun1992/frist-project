import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import notFound from "./app/middlwares/notFound";
import globalErrorHandler from "./app/middlwares/globalErrorhandler";
import router from "./app/routes";

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());
//application router
app.use("/api/v1/", router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get("/", test);

console.log(process.cwd());

app.use(globalErrorHandler)

app.use(notFound)

export default app;
