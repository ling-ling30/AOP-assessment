import { Router } from "express";
import * as controllers from "./controllers";
import { authenticateJWT } from "./middleware";

export const userRouter = Router();

userRouter.post("/register", controllers.register);
userRouter.post("/login", controllers.login);
userRouter.get("/profile", authenticateJWT, controllers.getProfile);
