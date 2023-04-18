import { createSlice } from "@reduxjs/toolkit"
import { Enemies } from "../../game/Enemies"
import calculateNextEnemyAction from "../../game/helpers/calculateNextEnemyAction"


const readCurrentEnemy = () => {
  const enemies = Object.keys(Enemies)
  const placeHolderEnemyKey = enemies[0] as keyof typeof Enemies
  const placeHolderEnemy = Enemies[placeHolderEnemyKey]
  const currentEnemy = localStorage.getItem("currentEnemy")
  return currentEnemy !== null ? JSON.parse(currentEnemy) : placeHolderEnemy
}

const initialState = {
  currentEnemy: readCurrentEnemy(),
  nextEnemyAction: localStorage.getItem("nextEnemyAction") || "attack",
  enemyBlock: Number(localStorage.getItem("enemyBlock")) || 0,
}

export const enemySlice = createSlice({
  name: 'enemy',
  initialState,
  reducers: {
    setCurrentEnemy: (state, action) => {
      state.currentEnemy = action.payload
      localStorage.setItem("currentEnemy", JSON.stringify(action.payload))
    },
    setNextEnemyAction: (state) => {
      state.nextEnemyAction = calculateNextEnemyAction(state.currentEnemy.special)
    },
    setEnemyBlock: (state, action) => {
      state.enemyBlock = action.payload
      localStorage.setItem("enemyBlock", JSON.stringify(action.payload))
    },
    enemyHealthChange: (state, action) => {
      const enemy = state.currentEnemy
      // console.log(enemy.currentHealth += action.payload)
      if (enemy.currentHealth + action.payload > enemy.maxHealth) {
        enemy.currentHealth = enemy.maxHealth
        state.currentEnemy = enemy
        localStorage.setItem("currentEnemy", JSON.stringify(enemy))
        return
      } else if (enemy.currentHealth + action.payload < 0) {
        enemy.currentHealth = 0
        state.currentEnemy = enemy
        localStorage.setItem("currentEnemy", JSON.stringify(enemy))
        return
      } else {
        enemy.currentHealth += action.payload
        state.currentEnemy = enemy
        localStorage.setItem("currentEnemy", JSON.stringify(enemy))
      }
    },
  },
})

export const { setCurrentEnemy, setNextEnemyAction, setEnemyBlock, enemyHealthChange } = enemySlice.actions

export default enemySlice.reducer
