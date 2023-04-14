import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  level: Number(localStorage.getItem("level")) || 1,
}

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    increment: (state) => {
      state.level += 1;
      localStorage.setItem("level", state.level.toString())
    },
    reset: (state) => {
      state.level = 1;
      localStorage.setItem("level", "1")
    }
  }
})

export const { increment, reset } = levelSlice.actions

export default levelSlice.reducer
