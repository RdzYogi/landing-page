import React, { useEffect, useState } from 'react'

function Card({card, handlePlayCard, index, reRender}: {card: any, handlePlayCard: any, index: number, reRender: boolean}) {

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
        data-index={index}
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
