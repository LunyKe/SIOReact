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
            setError(""); // Réinitialiser l'erreur
            setValue("");
        }
    }

    return (
        <div className="p-4 flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold">Todo List</h1>

            {/* Champ de saisie */}
            <input
                className="border border-gray-400 p-2 rounded-lg shadow-md"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ajouter une tâche"
            />

            {/* Affichage des erreurs */}
            {error && <p className="text-red-500">{error}</p>}

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
                onClick={handleAddTodo}
            >
                Add
            </button>

            {/* Liste des tâches */}
            <div className="w-1/2 grid-cols-3 grid gap-4 mt-4">
                {todos.map((todo, index) => (
                    <div className="flex items-center gap-4" key={index}>
                        <input type="checkbox" />
                        <p>{todo}</p>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
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