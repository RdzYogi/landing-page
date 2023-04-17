import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  playerClass: localStorage.getItem("playerClass") || "",
  maxHealth: Number(localStorage.getItem("maxHealth")) || 0,
  currentHealth: Number(localStorage.getItem("currentHealth")) || 0,
  maxMana: Number(localStorage.getItem("maxMana")) || 3,
  currentMana: Number(localStorage.getItem("currentMana")) || 3,
  block: Number(localStorage.getItem("block")) || 0,
  gameState: localStorage.getItem("gameState") || "playerSelect",
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerClass: (state, action) => {
      switch (action.payload) {
        case "warrior":
          state.playerClass = "warrior"
          state.maxHealth = 100
          state.currentHealth = 100
          state.maxMana = 3
          state.currentMana = 3
          state.block = 0
          localStorage.setItem("playerClass", "warrior")
          localStorage.setItem("maxHealth", "100")
          localStorage.setItem("currentHealth", "100")
          localStorage.setItem("maxMana", "3")
          localStorage.setItem("currentMana", "3")
          localStorage.setItem("block", "0")
          break;

        case "wizard":
          state.playerClass = "wizard"
          state.maxHealth = 80
          state.currentHealth = 80
          state.maxMana = 3
          state.currentMana = 3
          state.block = 0
          localStorage.setItem("playerClass", "wizard")
          localStorage.setItem("maxHealth", "80")
          localStorage.setItem("currentHealth", "80")
          localStorage.setItem("maxMana", "3")
          localStorage.setItem("currentMana", "3")
          localStorage.setItem("block", "0")
          break;

        default:
          break;
      }
    },
    resetPlayer: (state) => {
      state.playerClass = ""
      state.maxHealth = 0
      state.currentHealth = 0
      state.maxMana = 0
      state.currentMana = 0
      state.block = 0
      localStorage.setItem("playerClass", "")
      localStorage.setItem("maxHealth", "0")
      localStorage.setItem("currentHealth", "0")
      localStorage.setItem("maxMana", "0")
      localStorage.setItem("currentMana", "0")
      localStorage.setItem("block", "0")
    },
    setGameState: (state, action) => {
      state.gameState = action.payload
      localStorage.setItem("gameState", action.payload)
    },
    healthChange: (state, action) => {
      // console.log("healthChange called with payload: " + action.payload)
      if (state.currentHealth + action.payload > state.maxHealth) {
        state.currentHealth = state.maxHealth
        localStorage.setItem("currentHealth", state.maxHealth.toString())
        return
      } else if (state.currentHealth + action.payload < 0) {
        state.currentHealth = 0
        localStorage.setItem("currentHealth", "0")
        return
      } else {
        state.currentHealth += action.payload
        localStorage.setItem("currentHealth", state.currentHealth += action.payload)
      }
    }
  },
})

export const { setPlayerClass, setGameState, resetPlayer, healthChange } = playerSlice.actions

export default playerSlice.reducer