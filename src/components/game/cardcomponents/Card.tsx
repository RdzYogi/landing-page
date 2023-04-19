import React, { useEffect, useState } from 'react'
import calculateCardTransform from './helpers/calculateCardTransform'
import { useSelector } from 'react-redux'


function Card({card, total, index}: {card: any, total: number, index: number}) {
  // console.log("card triggered")
  // debugger
  const cardsInHand = useSelector((state: any) => state.player.numberOfCardsInHand)
  const turn = useSelector((state: any) => state.player.turn)
  // let transformClass = calculateCardTransform(total, index)
  const [transformClass, setTransformClass] = useState("")

  useEffect(() => {
    setTransformClass("scale-0 -translate-x-[100vh]")
    setTimeout(() => {
      setTransformClass(calculateCardTransform(total, index))
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsInHand,turn])

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



  const handleClick = () => {}

  return (
    <div
        onClick={handleClick}
        className={'w-48 h-72 -mx-10 bg-contain bg-center relative transition-all duration-300 ease-out transform hover:scale-125 hover:-translate-y-8 z-50 hover:rotate-0 hover:mx-12 ' + transformClass}
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
