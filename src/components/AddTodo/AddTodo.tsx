import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../redux/todo";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [error, setError] = useState("");


  const handleAddTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim().length < 5) {
      setError("En az 5 karakter giriniz");
    } else if (task.trim().length > 50) {
      setError("En fazla 50 karakter giriniz");
    } else {
      dispatch(addTodo({ task, id: uuidv4(), completed: false }));
      setTask("");
    }
  };


  const handleUpdateTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    if (task.trim().length > 5 && task.trim().length < 50) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleAddTaskSubmit} >
      <div>
        <input
          onChange={handleUpdateTodoChange}
          value={task}
          type="text"
          placeholder="Add todo..."
        />
        {error && <p>{error}</p>}
      </div>
      <button>Add Todo</button>
    </form>
  );
};

export default AddTodo;