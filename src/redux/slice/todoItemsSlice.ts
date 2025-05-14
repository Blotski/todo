import {createSlice } from '@reduxjs/toolkit';
import type { InitialState } from '../../types';


const initialState: InitialState = {
  value: []
}
const todoItemsSlice = createSlice({
  name: 'todoItems',
  initialState,
  reducers: {
    addItem: (state, action) => {state.value.push({name: action.payload, isCompleted: false})},
    removeItem: (state, action) => {
      const i = action.payload;
      state.value = [...state.value.slice(0, i), ...state.value.slice(i + 1)]
    },
    changeComplted: (state, action) => {
      const i = action.payload;
      state.value[i].isCompleted = (state.value[i].isCompleted ? false : true)
    }
  }
})

export default todoItemsSlice.reducer;
export const { addItem, removeItem, changeComplted } = todoItemsSlice.actions;