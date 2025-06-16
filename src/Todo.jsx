import { useState, useEffect } from "react";

function Todo() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    if (value.length < 5) {
      setError("La tâche doit contenir au moins 5 caractères.");
    } else if (value.length > 50) {
      setError("La tâche ne peut pas dépasser 50 caractères.");
    } else {
      setTodos([...todos, value]);
      setError("");
      setValue("");
    }
  }

  return (
    <div className="p-4 flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Todo List</h1>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          className="flex-1 border border-gray-400 p-2 rounded-lg shadow-md"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ajouter une tâche"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md w-full sm:w-auto"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {todos.map((todo, index) => (
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 shadow" key={index}>
            <input type="checkbox" />
            <p className="flex-1 break-words">{todo}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg shadow-md"
              onClick={() => {
                const newTodos = [...todos];
                newTodos.splice(index, 1);
                setTodos(newTodos);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;