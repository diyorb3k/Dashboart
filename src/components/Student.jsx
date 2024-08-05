import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo, updateTodo } from "../app/todo/productSlice";
import { Table, Button, Spin, Alert, Input } from "antd";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import StudentTodo from "./StudentTodo";
import StudentEdit from "./StudentEdit";

const Student = () => {
  const { loading, products, error } = useSelector((state) => state.products);
  console.log(products);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteTodo(id));
    }
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setCurrentTodo(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = products?.filter(
    (products) =>
      products.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      products.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
    {
      id: "ID",
      dataIndex: "id",
      key: "id",
      width: 300,
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
      width: 300,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 300,
    },
    {
      title: "Actio`ns",
      key: "actions",
      width: 300,
      render: (text, record) => (
        <>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
          <Button
            style={{ marginLeft: "8px" }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Students</h1>
      <StudentTodo/>
      <Input
        placeholder="Search by Title, First Name, or Last Name"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "16px" }}
      />
      {loading && <Spin tip="Loading..." />}
      {error && (
        <Alert message="Error" type="error" description={error} showIcon />
      )}
      <Table dataSource={filteredTodos} columns={columns} rowKey="id" />
      {isEditing && (
        <StudentEdit
          visible={isEditing}
          onClose={handleCloseEdit}
          todo={currentTodo}
        />
      )}
    </div>
  );
};

export default Student;
