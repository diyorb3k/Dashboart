import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo } from "../app/todo/todoSlice";
import AddTodo from "./AddTodo";

const Student = () => {
  const { loading, todos, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteTodo(id));
    }
  };

  return (
    <div>
      <AddTodo />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {todos.length > 0 && (
        <ol>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>{" "}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              <button>Edit</button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Student;
