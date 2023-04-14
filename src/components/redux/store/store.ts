import { configureStore } from '@reduxjs/toolkit';
import { levelSlice } from '../slices/levelSlice';
import { mapSlice } from '../slices/mapSlice';


export const store = configureStore({
  reducer: {
    level: levelSlice.reducer,
    map: mapSlice.reducer,
  },
});
