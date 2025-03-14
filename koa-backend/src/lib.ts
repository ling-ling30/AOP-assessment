import { Context, Next } from "koa";

export const tryCatch = (fn: Function) => async (ctx: Context, next: Next) => {
  try {
    await fn(ctx, next);
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
};
