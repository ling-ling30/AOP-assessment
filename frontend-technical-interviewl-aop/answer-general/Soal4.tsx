"use client";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:4001/api/todos";

type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export default function Soal4General() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos
  const fetchTodos = async () => {
    setError(null);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.message ?? "Something went wrong!";
        setError(errorMessage);
        return;
      }
      setTodos(data);
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    }
  };

  // Add new todo
  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) return setError("Title is required!");
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const newTodo = await response.json();
      if (!response.ok) {
        const errorMessage = newTodo.message ?? "Something went wrong!";
        setError(errorMessage);
        return;
      }
      fetchTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Toggle status
  const toggleTodo = async (id: string) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH",
      });
      const updatedTodo = await response.json();
      if (!response.ok) {
        const errorMessage = updatedTodo.message ?? "Something went wrong!";
        setError(errorMessage);
        return;
      }
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    setError(null);
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo.id !== id));
      fetchTodos();
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <pre>
        {`HOW TO RUN:
        - check postsgresql connection, by default will connect to localhost:5432 with user postgres and password postgres
        - run npm run dev
        - server will run on localhost:4001
        `}
      </pre>
      <div className="max-w-lg mx-auto my-10 p-6shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Todo App</h2>

        {/* Add Todo Form */}
        <div className="space-y-3">
          <form onSubmit={addTodo}>
            <input
              type="text"
              placeholder="Todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Todo"}
            </button>
          </form>
        </div>
        {error && (
          <div className="p-2 my-2 bg-red-800 w-fit">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Todo List */}
        <ul className="mt-5 space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-3 border-2 border-white rounded shadow-sm"
            >
              <div onClick={() => toggleTodo(todo.id)}>
                <p
                  className={`cursor-pointer ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </p>
                <p
                  className={`cursor-pointer ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.description}
                </p>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
