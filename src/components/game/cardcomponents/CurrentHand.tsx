import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import cardPicker from './helpers/cardPicker'
import Card from './Card';
import calculateCardTransform from './helpers/calculateCardTransform';
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
  // const [individualTransformClass, setIndividualTransformClass] = useState("")


  // Logic for deck sliding animation
  useEffect(() => {
    if(hand){
      const selectedCards = cardPicker(warriorDeck, 4, playerType) as CardType[]
      setHand(selectedCards)
    }
    setTransformClass("scale-0 translate-x-[90vh]")
    setTimeout(() => {
      setTransformClass("scale-0 -translate-x-[100vh]")
    }, 300);
    setTimeout(() => {
      setTransformClass("")
    }, 600);
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
        return <div key={card.name + index} className={'transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-8 z-50 hover:rotate-0 hover:mx-20 '+calculateCardTransform(hand.length,index)}><Card card={card} total={hand.length} index={index}/></div>
      })
      }
    </div>
  )
}

export default CurrentHand
