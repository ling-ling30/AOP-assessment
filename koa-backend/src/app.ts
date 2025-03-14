import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import route from "./route";

const app = new Koa();

// Middleware
app.use(cors());
app.use(bodyParser());

// Routes
app.use(route.routes());
app.use(route.allowedMethods());

app.use(async (ctx) => {
  ctx.body = { message: "Welcome to the Products API" };
});

export default app;
