export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];
let currentId = 1;

export const getTodos = (): Todo[] => todos;

export const getTodoById = (id: number): Todo | undefined => {
  return todos.find((todo) => todo.id === id);
};

export const addTodo = (title: string): Todo => {
  const newTodo: Todo = { id: currentId++, title, completed: false };
  todos.push(newTodo);
  return newTodo;
};

export const updateTodo = (
  id: number,
  updatedData: Partial<Todo>
): Todo | null => {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return null;

  todos[index] = { ...todos[index], ...updatedData };
  return todos[index];
};

export const deleteTodo = (id: number): Todo | null => {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const deletedTodo = todos.splice(index, 1)[0];
  return deletedTodo;
};
