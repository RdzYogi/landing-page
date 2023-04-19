import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import cardPicker from './helpers/cardPicker'
import Card from './Card';
type CardType = {
  name: string;
  description: string[];
  numberValues: number[];
  type: string;
  img: string;
  cost: number;
}

function CurrentHand() {
  const playerType = useSelector((state: any) => state.player.playerClass)
  const warriorDeck = useSelector((state: any) => state.player.warriorCurrentDeck)
  const cardsInHand = useSelector((state: any) => state.player.numberOfCardsInHand)
  const turn = useSelector((state: any) => state.player.turn)
  // console.log(warriorDeck, cardsInHand, playerType)
  const [hand, setHand] = useState([] as JSX.Element[])

  useEffect(() => {
    if(hand){
      const selectedCards = cardPicker(warriorDeck, cardsInHand, playerType)
      setHand([])
      selectedCards.forEach((card: CardType,index) => {
        // console.log("hand triggered")
        // debugger
        setHand(prev=>[...prev, <Card key={card.name + index} card={card} />])
      })
      // console.log(selectedCards)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn])
  return (
    <div className='flex items-center'>
      {hand}
    </div>
  )
}

export default CurrentHand
