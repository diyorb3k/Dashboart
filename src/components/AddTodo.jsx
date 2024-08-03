import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/todo/todoSlice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        title,
        completed: false,
      })
    );
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Something..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
