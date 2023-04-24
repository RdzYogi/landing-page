import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enemyHealthChange } from '../../redux/slices/enemySlice';
import { updateMana } from '../../redux/slices/playerSlice';

type CardType = {
  name: string;
  description: string[];
  numberValues: number[];
  type: string;
  img: string;
  cost: number;
}

function Card({card, handlePlayCard, index, reRender}: {card: CardType, handlePlayCard: any, index: number, reRender: boolean}) {

  const currentMana = useSelector((state: any) => state.player.currentMana)
  const dispatch = useDispatch()

  let description = ""
  // let discardAnimationClass = ""
  const [discardAnimationClass, setDiscardAnimationClass] = useState("")

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
  useEffect(() => {
    setDiscardAnimationClass("")
  }, [index])

  const handleClick = (e:any) => {
    if(card.cost > currentMana) return
    switch (card.type) {
      case "Attack":
        dispatch(enemyHealthChange(-card.numberValues[0]))
        dispatch(updateMana(-card.cost))
        break;

      default:
        break;
    }
    setDiscardAnimationClass("transform transition-all duration-300 ease-out scale-0 translate-x-[30vw]")
    handlePlayCard(e, index)
  }


  useEffect(() => {
    // console.log("trigger ")
    setDiscardAnimationClass("")
  }, [reRender])

  return (
    <div
        onClick={handleClick}
        data-name={card.name.toLowerCase()}
        className={'w-48 h-72 cursor-pointer -mx-10 bg-contain bg-center relative ' + discardAnimationClass}
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
