import {createSlice } from '@reduxjs/toolkit';
import type { InitialState } from '../ReduxTypes';


const initialState: InitialState = {
  value: []
}
const todoItemsSlice = createSlice({
  name: 'todoItems',
  initialState,
  reducers: {
    addItem: (state, action) => {state.value.push(action.payload)},
    removeItem: (state, action) => {
      const i = action.payload;
      state.value = [...state.value.slice(0, i), ...state.value.slice(i + 1)]
    }
  }
})

export default todoItemsSlice.reducer;
export const { addItem, removeItem } = todoItemsSlice.actions;