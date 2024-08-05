import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todo/todoSlice";
import { toDoProducts } from "./todo/productSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    products: toDoProducts,
  },
});

export default store;
