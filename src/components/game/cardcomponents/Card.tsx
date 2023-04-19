import React from 'react'


function Card({card, total, index}: {card: any, total: number, index: number}) {
  // console.log("card triggered")
  // debugger
  let description = ""
  console.log(total,index)
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

  let transformClass = ""
  if (total % 2 === 0) {
    const reference = (total / 2) + 0.5
    if (index + 1 < reference) {
      switch (reference-(index + 1)) {
        case 0.5:
            transformClass = "-rotate-[3deg]"
          break;
        case 1.5:
            transformClass = "-rotate-[9deg] translate-y-4"
          break;
        case 2.5:
            transformClass = "-rotate-[15deg] translate-y-8"
          break;

        default:
          break;
      }
      // transformClass = "-rotate-["+ ((reference-(index + 1))*6) +"deg] "
    } else {
      switch ((index + 1)-reference) {
        case 0.5:
            transformClass = "rotate-[3deg]"
          break;
        case 1.5:
            transformClass = "rotate-[9deg] translate-y-4"
          break;
        case 2.5:
            transformClass = "rotate-[15deg] translate-y-8"
          break;
        default:
          break;
      }
      // transformClass = "rotate-["+ (((index + 1)-reference)*6) +"deg] "
    }
  }else{
    const half = total/2 + 0.5
    if(index + 1 === half){
      transformClass = "-translate-y-2"
    }
    if(index + 1  < half){
      switch (half-(index+1)) {
        case 1:
            transformClass = "-rotate-[3deg]"
          break;
        case 2:
            transformClass = "-rotate-[9deg] translate-y-4"
          break;
        case 3:
            transformClass = "-rotate-[15deg] translate-y-8"
          break;

        default:
          break;
      }
    }else{
      switch ((index + 1)-half) {
        case 1:
            transformClass = "rotate-[3deg]"
          break;
        case 2:
            transformClass = "rotate-[9deg] translate-y-4"
          break;
        case 3:
            transformClass = "rotate-[15deg] translate-y-8"
          break;

        default:
          break;
      }
    }
  }
  const handleClick = () => {}

  return (
    <div
        onClick={handleClick}
        className={'w-48 h-72 -mx-10 bg-contain bg-center relative transition-all duration-300 ease-in-out transform hover:scale-125 hover:-translate-y-8 z-50 hover:rotate-0 hover:mx-12 ' + transformClass}
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
