import {createSlice } from '@reduxjs/toolkit';
import type { stateT } from '../ReduxTypes';

const initialState: stateT = {
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