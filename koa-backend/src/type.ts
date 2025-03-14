export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: Date;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}
