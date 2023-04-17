import { configureStore } from '@reduxjs/toolkit';
import { mapSlice } from '../slices/mapSlice';
import { playerSlice } from '../slices/playerSlice';


export const store = configureStore({
  reducer: {
    map: mapSlice.reducer,
    player: playerSlice.reducer,
  },
});
