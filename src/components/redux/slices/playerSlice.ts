import { createSlice } from "@reduxjs/toolkit"

const warriorStartingDeck = ["strike","strike","strike","strike","strike", "block", "block", "block", "block","block","rage","peace"]

const readWarriorCurrentDeck = () => {
  const currentDeck = localStorage.getItem("warriorCurrentDeck")
  return currentDeck !== null ? JSON.parse(currentDeck) : warriorStartingDeck
}

const readWarriorDrawPile = () => {
  const drawPile = localStorage.getItem("warriorDrawPile")
  // console.log(drawPile?.length)
  return ((drawPile !== null) && drawPile.length !==2) ? JSON.parse(drawPile) : randomizeDrawPile(warriorStartingDeck)
}
const randomizeDrawPile = (drawPile: string[]) => {
  for (let i = drawPile.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [drawPile[i], drawPile[j]] = [drawPile[j], drawPile[i]];
  }
  return drawPile
}

const readWarriorDiscardPile = () => {
  const discardPile = localStorage.getItem("warriorDiscardPile")
  return discardPile !== null ? JSON.parse(discardPile) : []
}

const readWarriorCardsInHand = () => {
  const cardsInHand = localStorage.getItem("warriorCardsInHand")
  return cardsInHand !== null ? JSON.parse(cardsInHand) : []
}

const initialState = {
  playerClass: localStorage.getItem("playerClass") || "",
  maxHealth: Number(localStorage.getItem("maxHealth")) || 0,
  currentHealth: Number(localStorage.getItem("currentHealth")) || 0,
  maxMana: Number(localStorage.getItem("maxMana")) || 3,
  currentMana: Number(localStorage.getItem("currentMana")) || 3,
  block: Number(localStorage.getItem("block")) || 0,
  gameState: localStorage.getItem("gameState") || "playerSelect",
  warriorCurrentDeck: readWarriorCurrentDeck(),
  // Max number of cards < 8 (7 is the max number of cards in hand)
  numberOfCardsInHand: Number(localStorage.getItem("numberOfCardsInHand")) || 5,
  warriorCardsInHand: readWarriorCardsInHand(),
  warriorDrawPile: readWarriorDrawPile(),
  warriorDiscardPile: readWarriorDiscardPile(),
  turn: Number(localStorage.getItem("turn")) || 0,
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
      } else if(state.block === 0){
        if (state.currentHealth + action.payload < 0) {
          state.currentHealth = 0
          localStorage.setItem("currentHealth", "0")
          return
        } else {
          state.currentHealth += action.payload
          localStorage.setItem("currentHealth", state.currentHealth += action.payload)
        }
      } else {
        if (state.block + action.payload < 0) {
          const damage = action.payload + state.block
          state.block = 0
          localStorage.setItem("block", "0")
          const newHealth = state.currentHealth + damage
          state.currentHealth = newHealth
          localStorage.setItem("currentHealth", (newHealth).toString())
          return
        } else {
          const newBlock = state.block + action.payload
          state.block = newBlock
          localStorage.setItem("block", newBlock.toString())
        }
      }
    },
    updatePlayerBlock: (state, action) => {
      const block = state.block + action.payload
      state.block = block
      localStorage.setItem("block", block.toString())
    },
    resetPlayerBlock: (state) => {
      state.block = 0
      localStorage.setItem("block", "0")
    },
    incrementTurn: (state) => {
      state.turn += 1
      localStorage.setItem("turn", (state.turn + 1).toString())
    },
    updateMana: (state, action) => {
      state.currentMana += action.payload
      localStorage.setItem("currentMana", state.currentMana.toString())
    },
    resetMana: (state) => {
      state.currentMana = state.maxMana
      localStorage.setItem("currentMana", state.maxMana.toString())
    },
    resetTurn: (state) => {
      state.turn = 0
      localStorage.setItem("turn", "0")
    },
    updateCardsInHand: (state, action) => {
      state.numberOfCardsInHand = action.payload
      localStorage.setItem("numberOfCardsInHand", action.payload.toString())
    },
    resetWarriorDecks: (state) => {
      state.warriorCurrentDeck = warriorStartingDeck
      state.warriorDrawPile = warriorStartingDeck
      state.warriorDiscardPile = []
      localStorage.setItem("warriorCurrentDeck", JSON.stringify(warriorStartingDeck))
      localStorage.setItem("warriorDrawPile", JSON.stringify(warriorStartingDeck))
      localStorage.setItem("warriorDiscardPile", JSON.stringify([]))
    },
    addToWarriorDeck: (state, action) => {
      const currentDeck = state.warriorCurrentDeck
      const drawPile = state.warriorDrawPile
      currentDeck.push(action.payload)
      drawPile.push(action.payload)
      state.warriorCurrentDeck = currentDeck
      state.warriorDrawPile = drawPile
      localStorage.setItem("warriorCurrentDeck", JSON.stringify(currentDeck))
      localStorage.setItem("warriorDrawPile", JSON.stringify(drawPile))
    },
    drawCards: (state) => {
      let drawPile = state.warriorDrawPile
      const warriorCurrentDeck = state.warriorCurrentDeck
      if (drawPile.length === 0) { drawPile = randomizeDrawPile(warriorCurrentDeck) }
      const cardsInHand = []
      const numberOfCardsInHand = state.numberOfCardsInHand
      // console.log("trigger")
      const cardsToDraw = numberOfCardsInHand
      for (let i = 0; i < cardsToDraw; i++) {
        if (drawPile.length === 0) {
          drawPile.push(...randomizeDrawPile(state.warriorDiscardPile))
          state.warriorDiscardPile = []
          localStorage.setItem("warriorDiscardPile", JSON.stringify([]))
        }
        const card = drawPile.pop()
        cardsInHand.push(card)
        // console.log(card)
      }
      state.warriorDrawPile = drawPile
      state.warriorCardsInHand = cardsInHand
      // console.log(cardsInHand)
      localStorage.setItem("warriorDrawPile", JSON.stringify(drawPile))
      localStorage.setItem("warriorCardsInHand", JSON.stringify(cardsInHand))
    },
    playCard: (state, action) => {
      const cardsInHand = state.warriorCardsInHand
      const cardIndex = cardsInHand.indexOf(action.payload)
      const discardPile = state.warriorDiscardPile
      cardsInHand.splice(cardIndex, 1)
      discardPile.push(action.payload)
      state.warriorCardsInHand = cardsInHand
      state.warriorDiscardPile = discardPile
      localStorage.setItem("warriorDrawPile", JSON.stringify(cardsInHand))
      localStorage.setItem("warriorDiscardPile", JSON.stringify(discardPile))
    },
    generateDrawPile: (state) => {
      const currentDeck = state.warriorCurrentDeck
      const drawPile = randomizeDrawPile(currentDeck)
      state.warriorDrawPile = drawPile
      localStorage.setItem("warriorDrawPile", JSON.stringify(drawPile))
      state.warriorDiscardPile = []
      localStorage.setItem("warriorDiscardPile", JSON.stringify([]))
    },
  },
})

export const {setPlayerClass,
              setGameState,
              resetPlayer,
              healthChange,
              updatePlayerBlock,
              resetPlayerBlock,
              incrementTurn,
              resetTurn,
              updateMana,
              resetMana,
              updateCardsInHand,
              resetWarriorDecks,
              addToWarriorDeck,
              drawCards,
              playCard,
              generateDrawPile
            } = playerSlice.actions

export default playerSlice.reducer
