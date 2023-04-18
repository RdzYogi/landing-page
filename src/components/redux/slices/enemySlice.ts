import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentEnemy: localStorage.getItem("currentEnemy") || "",
}

export const enemySlice = createSlice({
  name: 'enemy',
  initialState,
  reducers: {},
})

export const {} = enemySlice.actions

export default enemySlice.reducer
