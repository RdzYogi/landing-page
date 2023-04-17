import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  position: localStorage.getItem("level") || "0-0",
}

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    increment: (state,action) => {
      state.position += action.payload;
      localStorage.setItem("level", state.position.toString())
    },
    reset: (state) => {
      state.position = "0-0";
      localStorage.setItem("level", "0-0")
    }
  }
})

export const { increment, reset } = levelSlice.actions

export default levelSlice.reducer
