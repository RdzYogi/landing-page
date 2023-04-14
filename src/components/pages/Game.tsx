import React from 'react'
import UI from '../game/UI'



function Game() {
  const visible = false
  return (

      <div className='text-white z-20 w-full md:w-3/4 m-auto relative h-fit medieval'>
        {visible ? <UI/> : <p className='text-center'>Coming soon</p>}
      </div>

  )
}

export default Game
