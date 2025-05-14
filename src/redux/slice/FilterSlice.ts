import {createSlice } from '@reduxjs/toolkit';
import type { stateI } from '../../types';

const initialState: stateI = {
  value: 'all'
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    update: (state, action) => { state.value = action.payload} 
  }
})

export default filterSlice.reducer;
export const { update } = filterSlice.actions;
