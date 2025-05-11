import { configureStore } from "@reduxjs/toolkit";
import filterReducer from './slice/FilterReducer'
import todoItemReducer from './slice/todoItemsSlice'

const store =  configureStore({
  reducer: {
    filter: filterReducer,
    todoItems: todoItemReducer,
  }
})
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;