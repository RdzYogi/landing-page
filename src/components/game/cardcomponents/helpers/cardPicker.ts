import { warriorCards } from "./warriorCards";

type Card = {
  name: string;
  description: string[];
  numberValues: number[];
  type: string;
  img: string;
  cost: number;
}

function cardPicker(deck: string[], cardsInHand: number, playerType: string) {
  const cards = [] as Card[]

  // TODO: Discard pile and remaining deck

  // Logic for picking cards
  const keys = Object.keys(warriorCards)
  for (let i = 0; i < cardsInHand; i++) {
    if(playerType === "warrior") {
      const randomIndex = Math.floor(Math.random() * keys.length)
      const card = keys[randomIndex] as keyof typeof warriorCards
      // remove card from keys
      keys.splice(randomIndex, 1)
      cards.push(warriorCards[card])
    }
  }
  return cards
}

export default cardPicker
