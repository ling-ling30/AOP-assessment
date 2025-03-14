import { TodoRepository } from "./repository";
import { Todo, CreateTodoInput, UpdateTodoInput } from "./type";

export class TodoService {
  private todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return await this.todoRepository.findById(id);
  }

  async createTodo(todoData: CreateTodoInput): Promise<Todo> {
    return await this.todoRepository.create(todoData);
  }

  async updateTodo(id: string, updates: UpdateTodoInput): Promise<Todo | null> {
    return await this.todoRepository.update(id, updates);
  }

  async toggleTodoStatus(id: string): Promise<Todo | null> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      return null;
    }

    return await this.todoRepository.update(id, { completed: !todo.completed });
  }

  async deleteTodo(id: string): Promise<Todo | null> {
    return await this.todoRepository.delete(id);
  }
}
