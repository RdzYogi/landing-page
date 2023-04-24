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
      state.enemyBlock = 0
      localStorage.setItem("enemyBlock", "0")
    },
    setNextEnemyAction: (state) => {
      // console.log("triggered")
      const enemyAction = calculateNextEnemyAction(state.currentEnemy.special)
      state.nextEnemyAction = enemyAction
      localStorage.setItem("nextEnemyAction", enemyAction)
    },
    setEnemyBlock: (state, action) => {
      state.enemyBlock = action.payload
      localStorage.setItem("enemyBlock", JSON.stringify(action.payload))
    },
    resetEnemyBlock: (state) => {
      state.enemyBlock = 0
      localStorage.setItem("enemyBlock", "0")
    },
    enemyHealthChange: (state, action) => {
      const enemy = state.currentEnemy
      // console.log(enemy.currentHealth += action.payload)
      if (enemy.currentHealth + action.payload > enemy.maxHealth) {
        enemy.currentHealth = enemy.maxHealth
        state.currentEnemy = enemy
        localStorage.setItem("currentEnemy", JSON.stringify(enemy))
        return
      } else if (state.enemyBlock === 0) {
        if (enemy.currentHealth + action.payload < 0) {
          enemy.currentHealth = 0
          state.currentEnemy = enemy
          localStorage.setItem("currentEnemy", JSON.stringify(enemy))
          return
        } else {
          enemy.currentHealth += action.payload
          state.currentEnemy = enemy
          localStorage.setItem("currentEnemy", JSON.stringify(enemy))
        }
      } else {
        if (action.payload + state.enemyBlock > 0){
          const newBlock = state.enemyBlock + action.payload
          state.enemyBlock = newBlock
          localStorage.setItem("enemyBlock", JSON.stringify(newBlock))
        } else {
          const damage = action.payload + state.enemyBlock
          state.enemyBlock = 0
          localStorage.setItem("enemyBlock", "0")
          if (enemy.currentHealth + damage < 0) {
            enemy.currentHealth = 0
            state.currentEnemy = enemy
            localStorage.setItem("currentEnemy", JSON.stringify(enemy))
            return
          } else {
            const newHealth = enemy.currentHealth + damage
            enemy.currentHealth = newHealth
            state.currentEnemy = enemy
            localStorage.setItem("currentEnemy", JSON.stringify(enemy))
          }
        }
      }
    },
  },
})

export const { setCurrentEnemy,
  setNextEnemyAction,
  setEnemyBlock,
  resetEnemyBlock,
  enemyHealthChange } = enemySlice.actions

export default enemySlice.reducer
