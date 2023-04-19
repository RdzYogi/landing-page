import React, { useEffect } from 'react'
import UI from '../game/UI'


function Game() {
  const visible = true
  const [Ui , setUi] = React.useState(<div></div>)
  useEffect(() => {
    if(Ui){
      setUi(<UI/>)
      console.log("game triggered")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
      <div className='text-white z-20 w-full md:w-[90%] m-auto relative h-fit medieval'>
        {visible ? Ui : <p className='text-center'>Coming soon</p>}
      </div>

  )
}

export default Game
