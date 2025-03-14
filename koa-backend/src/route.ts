import Router from "@koa/router";
import { TodoController } from "./controller";

const router = new Router({ prefix: "/api/todos" });
const todoController = new TodoController();

router.get("/", todoController.getAll);
router.get("/:id", todoController.getById);
router.post("/", todoController.create);
router.put("/:id", todoController.update);
router.patch("/:id/toggle", todoController.toggleStatus);
router.delete("/:id", todoController.delete);

export default router;
