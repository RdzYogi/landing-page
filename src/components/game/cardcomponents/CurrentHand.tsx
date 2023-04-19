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
  const [hand, setHand] = useState([] as CardType[])
  const [transformClass, setTransformClass] = useState("")
  const [individualTransformClass, setIndividualTransformClass] = useState("")

  useEffect(() => {
    if(hand){
      const selectedCards = cardPicker(warriorDeck, cardsInHand, playerType) as CardType[]
      setHand(selectedCards)
    }
    setTransformClass("scale-0 -translate-x-[100vh]")
    setTimeout(() => {
      setTransformClass("")
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn])

  useEffect(() => {
    if(hand.length > 0){
      // console.log(hand)
    }
  }, [hand])
  return (
    <div className={'flex transition-all duration-300 ease-out items-center self-center ' + transformClass }>
      {hand.map((card: CardType, index) => {
        return <div key={card.name + index} className={''}><Card card={card} total={hand.length} index={index}/></div>
      })
      }
    </div>
  )
}

export default CurrentHand
