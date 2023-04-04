import React, { useEffect, useState } from 'react'
import warriorPortrait from '../../assets/game/warrior/portrait.png'
import wizardPortrait from '../../assets/game/wizard/portrait.png'
import Player from './Player'

function UI() {
  const [player, setPlayer] = useState("")
  const [playerDamage, setPlayerDamage] = useState(0)
  const [playerBlock, setPlayerBlock] = useState(0)

  useEffect(() => {
    const player = window.localStorage.getItem('player')
    if (player === null){
      const mainGame = document.getElementById('mainGame')
      const menu = document.getElementById('menu')
      if (mainGame === null || menu === null) return
      mainGame.classList.add('hidden')
      menu.classList.remove('hidden')
    } else {
      const mainGame = document.getElementById('mainGame')
      const menu = document.getElementById('menu')
      if (mainGame === null || menu === null) return
      mainGame.classList.remove('hidden')
      setPlayer(player)
    }
  }, [])

  const pickWarrior = () => {
    const mainGame = document.getElementById('mainGame')
    const menu = document.getElementById('menu')
    if (mainGame === null || menu === null) return
    mainGame.classList.remove('hidden')
    menu.classList.add('hidden')
    setPlayer('warrior')
    window.localStorage.setItem('player', 'warrior')
  }
  const pickWizard = () => {
    const mainGame = document.getElementById('mainGame')
    const menu = document.getElementById('menu')
    if (mainGame === null || menu === null) return
    mainGame.classList.remove('hidden')
    menu.classList.add('hidden')
    setPlayer('wizard')
    window.localStorage.setItem('player', 'wizard')
  }
  const newGame = () => {
    window.localStorage.removeItem('player')
    const mainGame = document.getElementById('mainGame')
    const menu = document.getElementById('menu')
    if (mainGame === null || menu === null) return
    mainGame.classList.add('hidden')
    menu.classList.remove('hidden')
  }
  return (
    <div>
      <div id="menu" className='hidden h-[60vh] w-full '>
        <h1 className='text-center pt-10'>Pick Your Class</h1>
        <div className='flex justify-around mt-10'>
          <div className='flex flex-col items-center'>
            <h1>Warrior</h1>
            <img onClick={pickWarrior} src={warriorPortrait} alt="warriorPortrait" className='w-44 cursor-pointer'/>
          </div>
          <div className='flex flex-col items-center'>
            <h1>Wizard</h1>
            <img onClick={pickWizard} src={wizardPortrait} alt="warriorPortrait" className='w-44 cursor-pointer'/>
          </div>

        </div>
      </div>
      <div id="mainGame" className='hidden'>
        <div id="info-bar" className='w-full h-10 bg-blue-500 '>
          <button onClick={newGame}>Abandon Run</button>
        </div>
        <div className='battle w-full h-[20vh] bg-gray-200 flex justify-around items-end my-10'>
          <div id="player" className='w-40 h-full'>
            <Player player={player} damage={playerDamage} playerBlock={playerBlock}/>
          </div>
          <div id="enemy" className='bg-red-200 w-40 h-full'>
          </div>
        </div>
        <div id='action-bar' className='w-full h-[30vh] bg-yellow-400'>
        </div>

      </div>
    </div>
  )
}

export default UI
