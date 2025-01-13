import React, { useState } from "react";
import axios from "axios";

function TodoForm({ fetchTodos }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title.trim()) {
        await axios.post(
          "http://localhost/todolist-project/backend/todos/create.php",
          {
            title,
            completed: false,
          }
        );
        setTitle("");
        fetchTodos(); // Panggil fungsi fetchTodos setelah berhasil menambahkan todo
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
