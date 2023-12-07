// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';

interface RootState {
  book: ReturnType<typeof bookReducer>;
}

const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});

export default store;
export type { RootState };
