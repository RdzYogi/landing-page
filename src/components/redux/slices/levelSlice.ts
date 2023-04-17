import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  position:  localStorage.getItem("level") || "start",
}

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    increment: (state,action) => {
      state.position = action.payload;
      localStorage.setItem("level", state.position.toString())
    },
    reset: (state) => {
      state.position = "start";
      localStorage.setItem("level", state.position)
    }
  }
})

export const { increment, reset } = levelSlice.actions

export default levelSlice.reducer
