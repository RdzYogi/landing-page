import React from 'react'
import UI from '../game/UI'



function Game() {
  const visible = true
  return (
      <div className='text-white z-20 w-full md:w-[90%] m-auto relative h-fit medieval'>
        {visible ? <UI/> : <p className='text-center'>Coming soon</p>}
      </div>

  )
}

export default Game
