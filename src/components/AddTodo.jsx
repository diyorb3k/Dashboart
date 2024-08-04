import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/todo/todoSlice";
import './Student.css'

const AddTodo = () => {
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
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button className="custom-stylish-button " type="submit"  onClick={{handleSubmit}}>Add</button>
      </form>
    </div>
  );
};

export default AddTodo;