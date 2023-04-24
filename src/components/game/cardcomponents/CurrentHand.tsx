import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cardPicker from './helpers/cardPicker'
import Card from './Card';
import calculateCardTransform from './helpers/calculateCardTransform';
import { drawCards } from '../../redux/slices/playerSlice';
import { warriorCards } from './helpers/warriorCards';
type CardType = {
  name: string;
  description: string[];
  numberValues: number[];
  type: string;
  img: string;
  cost: number;
}

function CurrentHand() {
  const dispatch = useDispatch()
  const playerType = useSelector((state: any) => state.player.playerClass)
  // const warriorDeck = useSelector((state: any) => state.player.warriorCurrentDeck)
  // const cardsInHand = useSelector((state: any) => state.player.numberOfCardsInHand)
  const turn = useSelector((state: any) => state.player.turn)
  const currentHand = useSelector((state: any) => state.player.warriorCardsInHand)
  // console.log(warriorDeck, cardsInHand, playerType)
  const [hand, setHand] = useState([] as CardType[])
  const [cardsToRender, setCardsToRender] = useState([] as JSX.Element[])
  const [transformClass, setTransformClass] = useState("")
  const [reRender , setReRender] = useState(false)
  // const [individualTransformClass, setIndividualTransformClass] = useState("")


  // Logic for deck sliding animation
  useEffect(() => {
    setTransformClass("scale-0 translate-x-[50vw]")
    console.log("first update")
    setTimeout(() => {
      if(hand){
        // dispatch(drawCards())
        setHand([])
        currentHand.forEach((card: keyof typeof warriorCards) => {
          setHand(prev=>[...prev, warriorCards[card]])
        })
      }
    }, 300);
    setTimeout(() => {
      setTransformClass("scale-0 -translate-x-[50vw]")
    }, 600);
    setTimeout(() => {
      setTransformClass("")
    }, 900);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn,currentHand])

  useEffect(() => {
    // setTimeout(() => {
      // console.log(hand)
      // console.log("object",currentHand)
      setCardsToRender(hand.map((card: CardType, index) => {
        return <div key={card.name + index} data-index={index} className={'transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-8 z-50 hover:rotate-0 hover:mx-20 '+ calculateCardTransform(hand.length,index)}><Card card={card} handlePlayCard={handlePlayCard} index={index} reRender={reRender}/></div>
      }))
      setReRender(!reRender)
    // }, 300);
  }, [hand,currentHand])

  const handlePlayCard = (e:any, index:number) => {

    setTimeout(() => {
      console.log(hand.filter((card, i) => (i !== index)))
      const newHand = hand.filter((card, i) => (i !== index))
      console.log(hand,newHand,index)
      setHand(newHand)
    }, 200);
   }

  return (
    <div className={'flex transition-all duration-300 ease-out items-center self-center ' + transformClass }>
      {cardsToRender}
    </div>
  )
}

export default CurrentHand
