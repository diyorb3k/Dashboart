import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const res = await axios.get("http://localhost:3000/users");
    return res.data;
  } catch (err) {
    return err.message;
  }
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  try {
    const res = await axios.post("http://localhost:3000/users", todo);
    return res.data;
  } catch (err) {
    return err.message;
  }
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/users/${id}`);
    return res.data;
  } catch (err) {
    return err.message;
  }
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  try {
    const res = await axios.put(`http://localhost:3000/users/${todo.id}`, todo);
    return res.data;
  } catch (err) {
    return err.message;
  }
});

const initialState = {
  loading: false,
  todos: [],
  error: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    search: (state) => {},
  },
  extraReducers: (builder) => {
    // fetchTodos
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.error.message;
    });
    // addTodo
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = [...state.todos, action.payload];
      state.error = "";
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.meta.arg);
      state.error = "";
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // updateTodo
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      state.error = "";
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;
