import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { editTodo as updateTodo } from "../../redux/todo";
import { TodoInterface } from "../../App";

type EditTodoProps = {
  editTodo: TodoInterface;
  setEditTodo: (editTodo: TodoInterface) => void;
};


const EditTodo = ({ editTodo }: EditTodoProps) => {
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {
      setTask(editTodo.task);
    }, [editTodo]);
  
    const handleEditTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (task.trim().length < 5) {
        setError("Minimum allowed task length is 5");
      } else if (task.trim().length > 50) {
        setError("Maximum allowed task length is 50");
      } else {
        dispatch(updateTodo({ editedTodo: { ...editTodo, task } }));
        
        setTask("");
      }
    };
  
    const handleUpdateTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTask(e.target.value);
      if (task.trim().length > 5 && task.trim().length < 50) {
        setError("");
      }
    };
  
    console.log(editTodo);
    return (
      <form onSubmit={handleEditTaskSubmit}>
        <div>
          <input
            onChange={handleUpdateTodoChange}
            value={task}
            type="text"
            placeholder="Edit todo..."
          />
          {error && <p>{error}</p>}
        </div>
        <button>Edit Todo</button>
      </form>
    );
  };
  
  export default EditTodo;