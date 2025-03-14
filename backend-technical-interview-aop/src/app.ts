import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { todoRouter } from "./soal1/routes";
import { userRouter } from "./soal2/routes";
import { notFound } from "./middleware";

//For env File
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRouter);
app.use("/api/auth", userRouter);

app.use(notFound);

export default app;
