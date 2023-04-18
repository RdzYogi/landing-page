import React, { useEffect, useState } from 'react'
import warriorPortrait from '../../assets/game/warrior/portrait.png'
import wizardPortrait from '../../assets/game/wizard/portrait.png'
import Player from './Player'
import enemyPicker from './helpers/enemyPicker'
import Enemy from './Enemy'
import Map from './Map'
import { useDispatch, useSelector } from 'react-redux'
import { healthChange, resetPlayer, setGameState, setPlayerClass } from '../redux/slices/playerSlice'
import { resetMap } from '../redux/slices/mapSlice'


function UI() {
  const playerPosition = useSelector((state: any) => state.map.position)
  const gameState = useSelector((state: any) => state.player.gameState)
  const dispatch = useDispatch()

  // const [player, setPlayer] = useState("")

  const [enemy, setEnemy] = useState({})
  const [enemyLoaded, setEnemyLoaded] = useState(false)

  useEffect(() => {
    // console.log(gameState)
    const mainGame = document.getElementById('mainGame')
    const menu = document.getElementById('menu')
    const minimap = document.getElementById('minimap')
    if (mainGame === null || menu === null || minimap === null) return
    switch (gameState) {
      case "playerSelect":
        if(!mainGame.classList.contains('hidden')) mainGame.classList.add('hidden')
        if(!minimap.classList.contains('hidden')) minimap.classList.add('hidden')
        menu.classList.remove('hidden')
        break;

      case "minimap":
        if(!mainGame.classList.contains('hidden')) mainGame.classList.add('hidden')
        if(!menu.classList.contains('hidden')) menu.classList.add('hidden')
        minimap.classList.remove('hidden')
        break;

      case "combat":
        if(!minimap.classList.contains('hidden')) minimap.classList.add('hidden')
        if(!menu.classList.contains('hidden')) menu.classList.add('hidden')
        mainGame.classList.remove('hidden')
        break;

      default:
        break;
    }
  }, [gameState])


  // New Enemy
  useEffect(() => {
    setEnemy(enemyPicker(playerPosition))
    setEnemyLoaded(true)
  }, [playerPosition])

  const newGame = () => {
    dispatch(setGameState("playerSelect"))
    dispatch(resetMap())
    dispatch(resetPlayer())
  }

  const pickPlayer = (e:any) => {
    // console.log(e.target.alt)
    switch (e.target.alt) {
      case "warriorPortrait":
        dispatch(setPlayerClass("warrior"))
        dispatch(setGameState("minimap"))
        break;
      case "wizardPortrait":
        dispatch(setPlayerClass("wizard"))
        dispatch(setGameState("minimap"))
        break;

      default:
        break;
    }
  }

  const handleWinBattle = () => {
    dispatch(setGameState("minimap"))
  }

  const handleTakeDamage = () => {
    const amount = - Math.round(Math.random() * 15)
    dispatch(healthChange(amount))
  }

  const handleHeal = () => {
    const amount = Math.round(Math.random() * 15)
    dispatch(healthChange(amount))
  }
  return (
    <div>
      <button onClick={newGame}>Abandon Run</button>
      <div id="menu" className='hidden h-[60vh] w-full '>
        <h1 className='text-center pt-10'>Pick Your Class</h1>
        <div className='flex justify-around mt-10'>
          <div className='flex flex-col items-center'>
            <h1>Warrior</h1>
            <img onClick={pickPlayer} src={warriorPortrait} alt="warriorPortrait" className='w-44 cursor-pointer'/>
          </div>
          <div className='flex flex-col items-center'>
            <h1>Wizard</h1>
            <img onClick={pickPlayer} src={wizardPortrait} alt="wizardPortrait" className='w-44 cursor-pointer'/>
          </div>

        </div>
      </div>
      <div id="minimap" className='hidden h-fit w-full '>
        <Map />
      </div>
      <div id="mainGame" className='hidden'>
        <div id="info-bar" className='w-full h-10  '>
          <button onClick={handleWinBattle}>Win Battle</button>
          <button className='mx-5' onClick={handleTakeDamage}>Take Damage</button>
          <button onClick={handleHeal}>Heal</button>

        </div>
        <div className='battle w-full h-[20vh] flex justify-around items-end my-10'>
          <div id="player" className='w-40 h-full'>
            <Player />
          </div>
          <div id="enemy" className='w-40 h-full'>
              <Enemy />
          </div>
        </div>
        <div id='action-bar' className='w-full h-[30vh] bg-yellow-400'>
        </div>

      </div>
    </div>
  )
}

export default UI
