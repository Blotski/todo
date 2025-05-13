import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from './slice/FilterSlice';
import todoItemReducer from './slice/todoItemsSlice';
import jsonPlaceholderReducer from './slice/jsonPlaceholderSlice';

import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
 } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
// check if store exists in localStorage
  // if yes: get it from ls
  // if no: create and add to ls

const rootReducer = combineReducers({
    filter: filterReducer,
    todoItems: todoItemReducer,
    fetchPlaceholder: jsonPlaceholderReducer,
})
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store =  configureStore({
//   reducer: {
    // filter: filterReducer,
    // todoItems: todoItemReducer,
    // fetchPlaceholder: jsonPlaceholderReducer,
//   }
// })

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;