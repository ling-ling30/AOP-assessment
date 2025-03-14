import { Request, Response } from "express";
import * as services from "./services";
import { tryCatch } from "../lib";

export const getTodos = tryCatch((req: Request, res: Response) => {
  const todos = services.getTodos();
  res.json(todos);
});

export const getTodoById = tryCatch((req: Request, res: Response) => {
  const id = Number(req.params.id);
  const todo = services.getTodoById(id);
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.json(todo);
});

export const createTodo = tryCatch((req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }
  const newTodo = services.addTodo(title);
  res.status(201).json(newTodo);
});

export const updateTodo = tryCatch((req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedTodo = services.updateTodo(id, req.body);

  if (!updatedTodo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  res.json(updatedTodo);
});

export const deleteTodo = tryCatch((req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!services.deleteTodo(id)) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  res.status(204).send();
});
