import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("products/fetchTodos", async () => {
  try {
    const res = await axios.get("http://localhost:3000/products");
    return res.data;
  } catch (err) {
    return err.message;
  }
});

export const addTodo = createAsyncThunk("products/addTodo", async (products) => {
  try {
    const res = await axios.post("http://localhost:3000/products", products);
    return res.data;
  } catch (err) {
    return err.message;
  }
});

export const deleteTodo = createAsyncThunk("products/deleteTodo", async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/products/${id}`);
    return res.data;
  } catch (err) {
    return err.message;
  }
});

export const updateTodo = createAsyncThunk("products/updateTodo", async (products) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/products/${products.id}`,
      todo
    );
    return res.data;
  } catch (err) {
    return err.message;
  }
});

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.error = "";
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.todos.filter(
          (todo) => products.id !== action.meta.arg
        );
        state.error = "";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
        state.error = "";
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const toDoProducts = productSlice.reducer;
export const todoActions = productSlice.actions;
