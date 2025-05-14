import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitialStateI, jsonPlaceholderI } from "../../types";

const API = `https://jsonplaceholder.typicode.com/posts`;

const initialState: InitialStateI = {
  value: null,
  status: null
}


export const fetchJsonPlaceholder = createAsyncThunk<jsonPlaceholderI[]>('app/fetchJsonPlaceholder', async () => {
  // const response = await fetch(API);
  // const data = await response.json();
  // return data;
  return new Promise<jsonPlaceholderI[]>((res, rej) => {
    setTimeout(async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        res(data)
      } catch(err) {
        rej(err)
      }
    }, 1000);

  })
  
})

const jsonPlaceholderSlice = createSlice({
  name: 'jsonPlaceholder',
  initialState,
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
