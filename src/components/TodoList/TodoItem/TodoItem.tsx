import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../../redux/todo";
import { TodoInterface } from "../../../App";

type TodoItemProps = {
  todo: TodoInterface;
  editTodo: TodoInterface | null;
  getEditTodo: (editTodo: TodoInterface) => void;
  setEditTodo: (editTodo: TodoInterface) => void;
};

const TodoItem = ({
  todo,
  editTodo,
  getEditTodo,
  setEditTodo,
}: TodoItemProps) => {
  const dispatch = useDispatch();

const handleToggleTodoChange = () =>
    dispatch(toggleTodo({ todoId: todo.id }));

  const handleDeleteTodoClick = () => {
    dispatch(deleteTodo({ todoId: todo.id }));
    if (todo.id === editTodo?.id) {
      setEditTodo({ id: "", task: "", completed: false });
    }
  };

  const handleGetEditTodoClick = () => getEditTodo(todo);


  return (
    <li>
      <label
        htmlFor={todo.id}
        style={
          todo.completed
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        <input
          onChange={handleToggleTodoChange}
          checked={todo.completed ? true : false}
          type="checkbox"
          id={todo.id}
        />
        {todo.task}
      </label>
      <div>
        <button 
            onClick={handleGetEditTodoClick}>
            <MdModeEditOutline />
        </button>
        <button
          onClick={handleDeleteTodoClick}
        >
        <FaTrashAlt />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;