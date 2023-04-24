import React from 'react'
import warriorEndTurn from '../../assets/game/warrior/warriorEndTurn.png'

function EndTurn({handleNextTurn}: {handleNextTurn: () => void}) {
  const handleClick = () => {
    handleNextTurn()
  }
  return (
    <div onClick={handleClick} className='relative h-fit cursor-pointer transform-all duration-300 hover:scale-105 self-end'>
      <img src={warriorEndTurn} alt="warrior end turn" className='w-32'/>
      <p className='absolute top-1/2 left-0 transform text-center -translate-y-1/2 w-full'>End Turn</p>
    </div>
  )
}

export default EndTurn
