import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo, updateTodo } from "../app/todo/todoSlice";
import { Table, Button, Spin, Alert, Input } from 'antd';
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";

const Teachers = () => {
  const { loading, todos, error } = useSelector((state) => state.todo);
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

  const filteredTodos = todos.filter((todo) => 
    todo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 300,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 300,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 300,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 300,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 300,
      render: (text, record) => (
        <>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
          <Button style={{ marginLeft: '8px' }} onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Teachers</h1>
      <AddTodo />
      <Input 
        placeholder="Search by Title, First Name, or Last Name" 
        value={searchTerm} 
        onChange={handleSearch} 
        style={{ marginBottom: '16px' }}
      />
      {loading && <Spin tip="Loading..." />}
      {error && <Alert message="Error" type="error" description={error} showIcon />}
      <Table dataSource={filteredTodos} columns={columns} rowKey="id" />
      {isEditing && 
        <EditTodo visible={isEditing} onClose={handleCloseEdit} todo={currentTodo} />
      }
    </div>
  );
};

export default Teachers;
