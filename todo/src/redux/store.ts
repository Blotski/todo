import { configureStore } from "@reduxjs/toolkit";
import filterReducer from './slice/FilterSlice'
import todoItemReducer from './slice/todoItemsSlice'
import jsonPlaceholderReducer from './slice/jsonPlaceholderSlice'
// import { fetchJsonPlaceholder } from "./slice/jsonPlaceholderSlice";

const store =  configureStore({
  reducer: {
    filter: filterReducer,
    todoItems: todoItemReducer,
    fetchPlaceholder: jsonPlaceholderReducer,
  }
})
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;