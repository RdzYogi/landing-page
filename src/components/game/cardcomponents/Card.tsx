import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enemyHealthChange } from '../../redux/slices/enemySlice';
import { setWarriorStance, updateMana, updatePlayerBlock } from '../../redux/slices/playerSlice';

type CardType = {
  name: string;
  description: string[];
  numberValues: number[];
  type: string;
  img: string;
  cost: number;
}

function Card({card, handlePlayCard, index, reRender}: {card: CardType, handlePlayCard: any, index: number, reRender: boolean}) {

  const stance = useSelector((state: any) => state.player.warriorStance)
  const [stanceClass, setStanceClass] = useState("")
  const [stanceValue, setStanceValue] = useState(1)
  useEffect(() => {
    switch (stance) {
      case "peace":
        switch (card.type) {
          case "Attack":
            setStanceClass("text-red-500")
            setStanceValue(1/2)
            break;
          case "Skill":
            setStanceClass("text-green-500")
            setStanceValue(2)
            break;

          default:
            break;
        }
        break;
      case "rage":
        switch (card.type) {
          case "Attack":
            setStanceClass("text-green-500")
            setStanceValue(2)
            break;
          case "Skill":
            setStanceClass("text-red-500")
            setStanceValue(1/2)
            break;

          default:
            break;
        }
        break;
      default:
        setStanceClass("")
        setStanceValue(1)
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[stance])
  const currentMana = useSelector((state: any) => state.player.currentMana)
  const dispatch = useDispatch()

  let description = []
  // let discardAnimationClass = ""
  const [discardAnimationClass, setDiscardAnimationClass] = useState("")

  // console.log(total,index)
  if (card.numberValues.length > 0) {
    for (let i = 0; i < card.numberValues.length; i++) {
      description.push(card.description[i])
      description.push(
        <span className={stanceClass} key={card.name + i}> {card.numberValues[i] * stanceValue} </span>
      )
    }
    if(card.description.length > card.numberValues.length){
      description.push(card.description[card.description.length - 1])
    }
  } else {
    description = card.description
  }
  useEffect(() => {
    setDiscardAnimationClass("")
  }, [index])

  const handleClick = (e:any) => {
    if(card.cost > currentMana) return
    switch (card.type) {
      case "Attack":
        dispatch(enemyHealthChange(-card.numberValues[0]*stanceValue))
        dispatch(updateMana(-card.cost))
        break;

      case "Skill":
        dispatch(updatePlayerBlock(card.numberValues[0]*stanceValue))
        dispatch(updateMana(-card.cost))
        break;

      case "Stance":
        dispatch(updateMana(-card.cost))
        switch (card.name) {
          case "Peace":
            dispatch(setWarriorStance("peace"))
            break;
          case "Rage":
            dispatch(setWarriorStance("rage"))
            break;

          default:
            break;
        }
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
