import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal } from 'antd';
import { useDispatch } from "react-redux";
import { updateTodo } from "../app/todo/todoSlice";

const EditTodo = ({ visible, onClose, todo }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(todo);
  }, [todo, form]);

  const handleSave = () => {
    form.validateFields().then(values => {
      dispatch(updateTodo({ ...todo, ...values }));
      onClose();
    });
  };

  return (
    <Modal
      title="Edit Todo"
      visible={visible}
      onCancel={onClose}
      onOk={handleSave}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input the first name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input the last name!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTodo;
