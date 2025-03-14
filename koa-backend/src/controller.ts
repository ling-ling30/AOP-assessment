import { Context } from "koa";
import { TodoService } from "./service";
import { tryCatch } from "./lib";
import { CreateTodoInput, UpdateTodoInput } from "./type";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  getAll = tryCatch(async (ctx: Context) => {
    const todos = await this.todoService.getAllTodos();
    ctx.body = todos;
  });

  getById = tryCatch(async (ctx: Context) => {
    const id = ctx.params.id;
    const todo = await this.todoService.getTodoById(id);

    if (!todo) {
      ctx.status = 404;
      ctx.body = { error: "Todo not found" };
      return;
    }

    ctx.body = todo;
  });

  create = tryCatch(async (ctx: Context) => {
    // Validate and extract data from the request body
    const { title, description } = ctx.request.body as CreateTodoInput;

    // Check if required fields are present
    if (!title) {
      ctx.status = 400;
      ctx.body = { error: "Title is required" };
      return;
    }

    const todoData: CreateTodoInput = {
      title,
      description: description || "",
    };

    // Call the service to create the todo
    const newTodo = await this.todoService.createTodo(todoData);

    // Respond with the created todo
    ctx.status = 201;
    ctx.body = newTodo;
  });

  update = tryCatch(async (ctx: Context) => {
    const id = ctx.params.id;
    const updates = ctx.request.body as UpdateTodoInput;

    if (Object.keys(updates).length === 0) {
      ctx.status = 400;
      ctx.body = { error: "No update data provided" };
      return;
    }

    const updatedTodo = await this.todoService.updateTodo(id, updates);

    if (!updatedTodo) {
      ctx.status = 404;
      ctx.body = { error: "Todo not found" };
      return;
    }

    ctx.body = updatedTodo;
  });

  toggleStatus = tryCatch(async (ctx: Context) => {
    const id = ctx.params.id;
    const updatedTodo = await this.todoService.toggleTodoStatus(id);

    if (!updatedTodo) {
      ctx.status = 404;
      ctx.body = { error: "Todo not found" };
      return;
    }

    ctx.body = updatedTodo;
  });

  delete = tryCatch(async (ctx: Context) => {
    const id = ctx.params.id;
    const deletedTodo = await this.todoService.deleteTodo(id);

    if (!deletedTodo) {
      ctx.status = 404;
      ctx.body = { error: "Todo not found" };
      return;
    }

    ctx.body = { message: "Todo deleted successfully", todo: deletedTodo };
  });
}
