import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList = [...state.todoList, action.payload];
    },
    deleteTodo: (state, action) => {
      const index = action.payload;
      state.todoList.splice(index, 1);
    },
    markTodoAsDone: (state, action) => {
      const index = action.payload;
      state.todoList[index].done = !state.todoList[index].done;
    },
    clearAll: (state) => {
      state.todoList = [];
    },
  },
});

export const { addTodo, deleteTodo, markTodoAsDone, clearAll } =
  todoSlice.actions;

export default todoSlice.reducer;
