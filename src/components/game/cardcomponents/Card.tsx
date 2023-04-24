import React, { useEffect, useState } from 'react'
import calculateCardTransform from './helpers/calculateCardTransform'
import { useDispatch, useSelector } from 'react-redux'
import { updateCardsInHand } from '../../redux/slices/playerSlice'


function Card({card, total, index}: {card: any, total: number, index: number}) {
  // console.log("card triggered")
  // debugger
  const dispatch = useDispatch()
  const cardsInHand = useSelector((state: any) => state.player.numberOfCardsInHand)
  const turn = useSelector((state: any) => state.player.turn)
  // let transformClass = calculateCardTransform(total, index)
  const [transformClass, setTransformClass] = useState("")

  useEffect(() => {
    // setTransformClass("scale-0 -translate-x-[100vh]")
    // setTimeout(() => {
      setTransformClass(calculateCardTransform(cardsInHand, index))
    // }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn])

  let description = ""

  // console.log(total,index)
  if (card.numberValues.length > 0) {
    for (let i = 0; i < card.numberValues.length; i++) {
      description += card.description[i] + " " + card.numberValues[i] + " "
    }
    if(card.description.length > card.numberValues.length){
      description += card.description[card.description.length - 1]
    }
  } else {
    description = card.description[0]
  }

  const handleClick = (e: any) => {
    // dispatch(updateCardsInHand(cardsInHand - 1))
    // setTransformClass(calculateCardTransform(cardsInHand-1, index))
    e.target.classList.add("hidden")
  }

  return (
    <div
        onClick={handleClick}
        className={'w-48 h-72 cursor-pointer -mx-10 bg-contain bg-center relative transform '}
        style={{backgroundImage: `url(${card.img})`}}>
      <h1 className='relative top-[5%] left-[50%] w-fit pointer-events-none'
          style={{transform: 'translateX(-55%)'}}>
            {card.name}
      </h1>
      <h1 className='relative top-[80%] left-[50%] w-fit text-sm pointer-events-none'
          style={{transform: 'translateX(-55%)'}}>
        {card.type}
      </h1>
      <h1 className='relative top-[69%] left-[18%] w-fit text-xl pointer-events-none'
          style={{transform: 'translateX(-55%)'}}>
        {card.cost}
      </h1>
      <div className='relative h-14 w-28 top-[33%] left-[52%] pointer-events-none'
      style={{transform: 'translateX(-55%)'}}>
        <p className='text-xs text-center'>{description}</p>
      </div>
    </div>
  )
}

export default Card
