import { warriorCards } from "./warriorCards";

type CardType = {
  name: string;
  description: string[];
  numberValues: number[];
  type: string;
  img: string;
  cost: number;
}

function cardPicker(deck: string[], cardsInHand: number, playerType: string) {
  const cards = [] as CardType[]

  // TODO: Discard pile and remaining deck

  // Logic for picking cards
  const deckCopy = [...deck]
  for (let i = 0; i < cardsInHand; i++) {
    if(playerType === "warrior") {
      // get a random card from deck
      const randomIndex = Math.floor(Math.random() * deckCopy.length)
      const card = deckCopy[randomIndex] as keyof typeof warriorCards
      // remove card from deckCopy
      deckCopy.splice(randomIndex, 1)
      cards.push(warriorCards[card])
    }
  }
  return cards
}

export default cardPicker
