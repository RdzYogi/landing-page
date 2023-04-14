import React from 'react'
import UI from '../game/UI'
import { Provider } from 'react-redux'
import { store } from '../redux/store/store'


function Game() {
  const visible = false
  return (
    <Provider store={store}>
      <div className='text-white z-20 w-full md:w-3/4 m-auto relative h-fit medieval'>
        {visible ? <UI/> : <p className='text-center'>Coming soon</p>}
      </div>
    </Provider>
  )
}

export default Game
