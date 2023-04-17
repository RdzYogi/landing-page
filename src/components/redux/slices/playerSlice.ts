import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  playerClass: "warrior",
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
})

export default playerSlice.reducer
