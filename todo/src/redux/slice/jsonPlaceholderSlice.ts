import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import type { InitialStateI } from "../../types";

const API = `https://jsonplaceholder.typicode.com/posts`;

// const initialState: InitialStateI = {
//   value: null,
//   status: null
// }

export const fetchJsonPlaceholder = createAsyncThunk('app/fetchJsonPlaceholder', async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data;
})

const jsonPlaceholderSlice = createSlice({
  name: 'jsonPlaceholder',
  initialState: {
    value: null,
    status: null,
  } as InitialStateI,
  // initialState,
  reducers: {
    clean: (state) => {state.value = null}
   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJsonPlaceholder.pending, (state) => {
      state.status = 'pending';
    })
      .addCase(fetchJsonPlaceholder.fulfilled, (state, action) => {
        state.status = 'fullfiled';
        state.value = action.payload;
    })
      .addCase(fetchJsonPlaceholder.rejected, (state) => {
        state.status = 'rejected';
    })
  }
})


export default jsonPlaceholderSlice.reducer;
export const {clean} = jsonPlaceholderSlice.actions;
