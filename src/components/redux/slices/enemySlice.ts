import { createSlice } from "@reduxjs/toolkit"
import { Enemies } from "../../game/Enemies"


const readCurrentEnemy = () => {
  const enemies = Object.keys(Enemies)
  const placeHolderEnemyKey = enemies[0] as keyof typeof Enemies
  const placeHolderEnemy = Enemies[placeHolderEnemyKey]
  const currentEnemy = localStorage.getItem("currentEnemy")
  return currentEnemy !== null ? JSON.parse(currentEnemy) : placeHolderEnemy
}

const initialState = {
  currentEnemy: readCurrentEnemy(),
  nextEnemyAction: localStorage.getItem("nextEnemyAction") || "",
}

export const enemySlice = createSlice({
  name: 'enemy',
  initialState,
  reducers: {
    setCurrentEnemy: (state, action) => {
      state.currentEnemy = action.payload
      localStorage.setItem("currentEnemy", JSON.stringify(action.payload))
    }
  },
})

export const {} = enemySlice.actions

export default enemySlice.reducer
