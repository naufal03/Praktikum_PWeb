import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost/todolist-project/backend/todos/read.php"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add or update todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editTodo) {
      try {
        await axios.put(
          "http://localhost/todolist-project/backend/todos/update.php",
          {
            id: editTodo.id,
            title,
            completed: editTodo.completed,
          }
        );
        setEditTodo(null);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      try {
        await axios.post(
          "http://localhost/todolist-project/backend/todos/create.php",
          {
            title,
            completed: false,
          }
        );
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
    setTitle("");
    fetchTodos();
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        "http://localhost/todolist-project/backend/todos/delete.php",
        {
          data: { id },
        }
      );
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Edit todo
  const handleEdit = (todo) => {
    setEditTodo(todo);
    setTitle(todo.title);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {editTodo ? "Update" : "Add"}
            </button>
          </div>
        </form>
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
            >
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(todo)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
