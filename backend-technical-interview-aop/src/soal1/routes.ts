import { Router } from "express";
import * as controllers from "./controllers";

export const todoRouter = Router();

todoRouter.get("/", controllers.getTodos);
todoRouter.get("/:id", controllers.getTodoById);
todoRouter.post("/", controllers.createTodo);
todoRouter.put("/:id", controllers.updateTodo);
todoRouter.delete("/:id", controllers.deleteTodo);
