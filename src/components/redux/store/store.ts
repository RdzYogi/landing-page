import { configureStore } from '@reduxjs/toolkit';
import { mapSlice } from '../slices/mapSlice';
import { playerSlice } from '../slices/playerSlice';
import { enemySlice } from '../slices/enemySlice';
import { devSlice }from '../slices/devSlice';


export const store = configureStore({
  reducer: {
    map: mapSlice.reducer,
    player: playerSlice.reducer,
    enemy: enemySlice.reducer,
    dev: devSlice.reducer,
  },
});
