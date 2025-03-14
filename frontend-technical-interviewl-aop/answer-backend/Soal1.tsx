"use client";
import React, { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Soal1Backend() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [ID, setID] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addTodo, setAddTodo] = useState("");

  const fetchData = async () => {
    console.log("test");
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/todos");
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setTodos(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const handleAddTodo = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!addTodo) {
        setError("Please enter a title");
        setLoading(false);
        return;
      }
      const response = await fetch("http://localhost:4000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: addTodo }),
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to add data");
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 204) {
        return setError("Failed to delete data");
      }
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to delete data");
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (id: number) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) {
        setError("Failed to update data");
        setLoading(false);
        return;
      }
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to update data");
      setLoading(false);
    }
  };

  const fetchTodoById = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 404) {
        setError("Todo not found");
        setLoading(false);
        return;
      }
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setTodo(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex space-x-4 items-center">
        <h3>RESTful API Todo :</h3>
        {loading && <p>Loading...</p>}
        {error && (
          <div className="p-2  bg-red-800 w-fit">
            <p className="text-red-300">{error}</p>
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          className="bg-gray-800 text-white rounded-sm px-4 py-2 hover:bg-gray-500"
          onClick={fetchData}
        >
          Fetch Data
        </button>

        <div className="p-5 border-2 border-white rounded-lg">
          To do list :{todos.length === 0 && <p>No items</p>}
          {todos.map((item, index) => {
            return (
              <div key={index} className="flex mt-1  items-center">
                <section className="w-1/2 flex justify-between mr-4 items-center">
                  <p className="">
                    {index + 1}. {item.title}
                  </p>
                  <span>{item.completed ? "Completed" : "Not Completed"}</span>
                </section>
                <section className=" space-x-4">
                  <button
                    className="bg-gray-800 text-white rounded-sm px-4 py-2 hover:bg-gray-500"
                    type="button"
                    onClick={() => handleDeleteTodo(item.id)}
                  >
                    🗑️
                  </button>
                  <button
                    className="bg-gray-800 text-white rounded-sm px-4 py-2 hover:bg-gray-500"
                    type="button"
                    onClick={() => handleUpdateTodo(item.id)}
                  >
                    ✅
                  </button>
                </section>
              </div>
            );
          })}
        </div>

        <div className="flex items-center mt-2">
          <input
            type="text"
            placeholder="Add Todo"
            className="border-2 border-white rounded-sm mr-4"
            onChange={(e) => setAddTodo(e.target.value)}
          />
          <button
            type="button"
            className="bg-gray-800 text-white rounded-sm px-4 py-2 hover:bg-gray-500"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>

        <div className="mt-2">
          <section>
            <label className="mx-2">Search to do by ID</label>
            <input
              type="text"
              className="border-2 border-white rounded-sm mr-4"
              placeholder="ID"
              onChange={(e) => setID(Number(e.target.value))}
            />
            <button
              className="bg-gray-800 text-white rounded-sm px-4 py-2 hover:bg-gray-500"
              type="button"
              onClick={fetchTodoById}
            >
              Search
            </button>
          </section>
          <section>
            {todo && <pre>{JSON.stringify(todo, null, 2)}</pre>}
          </section>
        </div>
      </div>
    </div>
  );
}
