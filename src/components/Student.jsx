import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo } from "../app/todo/todoSlice";
import { Table, Button, Spin, Alert } from 'antd';
import AddTodo from "./AddTodo";

const Student = () => {
  const { loading, todos, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteTodo(id));
    }
  };

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
          <Button style={{ marginLeft: '8px' }}>Edit</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <AddTodo />
      {loading && <Spin tip="Loading..."/>}
      {error && <Alert message="Error" type="error" description={error} showIcon />}
      <Table dataSource={todos} columns={columns} rowKey="id" />
    </div>
  );
};

export default Student;
