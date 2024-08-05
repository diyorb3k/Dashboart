import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/todo/todoSlice";
import './Student.css'

const StudentTodo = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        title,
        firstName,
        lastName,
        completed: false,
      })
    );
    setTitle("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="forminput" >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Education"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder=" Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button className="custom-stylish-button " type="submit"  onClick={{handleSubmit}}>Add</button>
      </form>
    </div>
  );
};

export default StudentTodo;