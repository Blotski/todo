import {createSlice } from '@reduxjs/toolkit';
import type { filter } from '../../AppWithRedux'

type stateT = {
  value: filter
}
const initialState: stateT = {
  value: 'all'
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    update: (state, action) => { state.value = action.payload} // update is an action creator
  }
})
// console.log('filterSlice- ', filterSlice)
export default filterSlice.reducer;
export const { update } = filterSlice.actions;