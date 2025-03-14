import pool from "./config/db";
import { Todo, CreateTodoInput, UpdateTodoInput } from "./type";

const TABLE_NAME = "todos_interview_mini_project"; // Define table name as a constant

export class TodoRepository {
  async findAll(): Promise<Todo[]> {
    const query = `SELECT * FROM ${TABLE_NAME} ORDER BY created_at DESC`; // Use template literals
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id: string): Promise<Todo | null> {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`; // Table name is not parameterized
    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async create(todo: CreateTodoInput): Promise<Todo> {
    const query = `INSERT INTO ${TABLE_NAME} (title, description, completed) VALUES ($1, $2, $3) RETURNING *`;
    const result = await pool.query(query, [
      todo.title,
      todo.description || null,
      false,
    ]);
    return result.rows[0];
  }

  async update(id: string, updates: UpdateTodoInput): Promise<Todo | null> {
    const checkQuery = `SELECT * FROM ${TABLE_NAME} WHERE id = $1`;
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.rows.length === 0) {
      return null;
    }

    const currentTodo = checkResult.rows[0];
    const updatedFields = {
      title: updates.title ?? currentTodo.title,
      description: updates.description ?? currentTodo.description,
      completed: updates.completed ?? currentTodo.completed,
    };

    const updateQuery = `UPDATE ${TABLE_NAME} SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *`;
    const result = await pool.query(updateQuery, [
      updatedFields.title,
      updatedFields.description,
      updatedFields.completed,
      id,
    ]);

    return result.rows[0];
  }

  async delete(id: string): Promise<Todo | null> {
    const query = `DELETE FROM ${TABLE_NAME} WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }
}
