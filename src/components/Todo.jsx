import { useState } from "react";

const TodoApp = () => {
  const [todo, setTodo] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editedIndex, setEditedIndex] = useState(null);

  const handleAdd = () => {
    if (!newTask.trim()) return;

    if (editedIndex === null) {
      setTodo([...todo, newTask]);
    } else {
      const editedArr = [...todo];
      editedArr[editedIndex] = newTask;
      setTodo(editedArr);
      setEditedIndex(null);
    }
    setNewTask("");
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedTaskArr = todo.filter((_, index) => index !== id);
    setTodo(updatedTaskArr);
  };

  const handleEdit = (id) => {
    setNewTask(todo[id]);
    setEditedIndex(id);
  };

  return (
    <div className="bg-gray-100 h-[100vh] flex flex-col items-center">
      <header className="w-full bg-purple-600 text-white py-4">
        <h1 className="text-center text-4xl font-bold">Todo App</h1>
      </header>
      <div className="mt-20 w-[500px] max-w-[500px] bg-white p-4">
        <div className="flex items-center w-full h-[42px] gap-2">
          <input
            type="text"
            placeholder="Enter Task"
            className="flex border border-gray-400 p-2 w-full"
            onChange={handleChange}
            value={newTask}
          />
          <button
            className="bg-purple-600 text-white h-full px-4"
            onClick={handleAdd}
          >
            {editedIndex === null ? "Add" : "Update"}
          </button>
        </div>
        <div>
          {todo.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No tasks yet!</p>
          ) : (
            <ul>
              {todo.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center my-2"
                >
                  <span>{task}</span>
                  <div>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 mr-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
