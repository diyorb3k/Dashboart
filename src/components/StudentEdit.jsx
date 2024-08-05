import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal } from 'antd';
import { useDispatch } from "react-redux";
import { updateTodo } from "../app/todo/productSlice";

const StudentEdit = ({ visible, onClose, todo }) => {
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
      title="Edit Product"
      visible={visible}
      onCancel={onClose}
      onOk={handleSave}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please input the category!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="education" label="Education" rules={[{ required: true, message: 'Please input the education!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentEdit;
