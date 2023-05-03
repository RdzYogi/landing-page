import React, { useEffect, useState } from 'react'
import warriorPortrait from '../../assets/game/warrior/portrait.png'
import wizardPortrait from '../../assets/game/wizard/portrait.png'
import Player from './Player'
import enemyPicker from './helpers/enemyPicker'
import Enemy from './Enemy'
import Map from './Map'
import { useDispatch, useSelector } from 'react-redux'
import { drawCards, generateDrawPile, healthChange, incrementTurn, playCard, resetMana, resetPlayer, resetPlayerBlock, resetTurn, resetWarriorDecks, setGameState, setPlayerClass, updateCardsInHand } from '../redux/slices/playerSlice'
import { resetMap } from '../redux/slices/mapSlice'
import { enemyHealthChange, resetEnemyBlock, setCurrentEnemy, setEnemyBlock, setNextEnemyAction } from '../redux/slices/enemySlice'
import CurrentHand from './cardcomponents/CurrentHand'
import Energy from './Energy'
import EndTurn from './EndTurn'

const DEV_MODE = true

function UI() {
  const playerPosition = useSelector((state: any) => state.map.position)
  const gameState = useSelector((state: any) => state.player.gameState)
  const playerCurrentHealth = useSelector((state: any) => state.player.currentHealth)
  const enemyCurrentHealth = useSelector((state: any) => state.enemy.currentEnemy.currentHealth)
  const drawPile = useSelector((state: any) => state.player.warriorDrawPile)
  const discardPile = useSelector((state: any) => state.player.warriorDiscardPile)
  const warriorCurrentHand = useSelector((state: any) => state.player.warriorCardsInHand)
  const enemyNextAction = useSelector((state: any) => state.enemy.nextEnemyAction)
  const enemyDamage = useSelector((state: any) => state.enemy.currentEnemy.attack.min)
  const enemyBlock = useSelector((state: any) => state.enemy.currentEnemy.defense.min)
  const dispatch = useDispatch()

  // const [player, setPlayer] = useState("")


  useEffect(() => {
    // console.log("UI triggered")

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


  const newGame = () => {
    dispatch(setGameState("playerSelect"))
    dispatch(resetMap())
    dispatch(resetPlayer())
    const newEnemy = enemyPicker(playerPosition)
    dispatch(setCurrentEnemy(newEnemy))
    dispatch(resetEnemyBlock())
    dispatch(resetTurn())
    dispatch(resetMana())
    dispatch(resetPlayerBlock())
    dispatch(setNextEnemyAction())
  }

  const pickPlayer = (e:any) => {
    // console.log(e.target.alt)
    switch (e.target.alt) {
      case "warriorPortrait":
        dispatch(setPlayerClass("warrior"))
        dispatch(setGameState("minimap"))
        dispatch(resetWarriorDecks())

        break;
      case "wizardPortrait":
        dispatch(setPlayerClass("wizard"))
        dispatch(setGameState("minimap"))
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    // console.log(enemyCurrentHealth)
    if(enemyCurrentHealth <= 0) {
      handleWinBattle()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemyCurrentHealth])

  useEffect(() => {
    // console.log(playerCurrentHealth)
    if(playerCurrentHealth <= 0) {
      newGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCurrentHealth])

  const handleWinBattle = () => {
    dispatch(resetTurn())
    dispatch(setGameState("minimap"))
    const newEnemy = enemyPicker(playerPosition)
    dispatch(setCurrentEnemy(newEnemy))
    dispatch(setNextEnemyAction())
    dispatch(resetMana())
    dispatch(generateDrawPile())
    dispatch(drawCards())
  }

  const handleTakeDamage = () => {
    const amount = - Math.round(Math.random() * 10 + 5)
    dispatch(healthChange(amount))
  }

  const handleHeal = () => {
    const amount = Math.round(Math.random() * 10 + 5)
    dispatch(healthChange(amount))
  }

  const handleDealDamage = () => {
    const amount = - Math.round(Math.random() * 5 + 1)
    dispatch(enemyHealthChange(amount))
  }
  const handleHealEnemy = () => {
    const amount = Math.round(Math.random() * 5 + 1)
    dispatch(enemyHealthChange(amount))
  }
  const handleNewEnemy = () => {
    const newEnemy = enemyPicker(playerPosition)
    dispatch(setCurrentEnemy(newEnemy))
  }

  const handleNextTurn = () => {
    switch (enemyNextAction) {
      case "attack":
        dispatch(healthChange(-enemyDamage))
        dispatch(resetEnemyBlock())
        break;
      case "defend":
        dispatch(setEnemyBlock(enemyBlock))
        break;

      default:
        dispatch(resetEnemyBlock())
        break;
    }

    warriorCurrentHand.forEach((card: any) => {
      dispatch(playCard(card))
    })
    dispatch(resetMana())
    dispatch(incrementTurn())
    dispatch(drawCards())
    dispatch(setNextEnemyAction())
    dispatch(resetPlayerBlock())
  }

  const handleResetTurn = () => {
    dispatch(resetTurn())
    dispatch(resetMana())
    dispatch(resetPlayerBlock())
  }
  return (
    <div className='w-full'>
      <button onClick={newGame}>Abandon Run</button>
      <div id="menu" className='hidden h-[60vh] w-full '>
        <h1 className='text-center pt-10'>Pick Your Class</h1>
        <div className='flex justify-around mt-10'>
          <div className='flex flex-col items-center'>
            <h1>Warrior</h1>
            <img onClick={pickPlayer} src={warriorPortrait} alt="warriorPortrait" className='w-44 cursor-pointer transition-all duration-300 hover:scale-105'/>
          </div>
          <div className='flex flex-col items-center'>
            <h1>Wizard</h1>
            <img src={wizardPortrait} alt="wizardPortrait" className='w-44 grayscale'/>
            <h1>(coming soon)</h1>
          </div>

        </div>
      </div>
      <div id="minimap" className='hidden h-fit w-full '>
        <Map />
      </div>
      <div id="mainGame" className='hidden'>
        <div id="info-bar" className='w-full h-10'>
          {DEV_MODE &&
            <>
              <button onClick={handleWinBattle}>Win Battle</button>
              <button className='mx-5' onClick={handleTakeDamage}>Take Damage</button>
              <button onClick={handleHeal}>Heal</button>
              <button className='mx-5' onClick={handleDealDamage}>Deal Damage</button>
              <button onClick={handleHealEnemy}>Heal Enemy</button>
              <button className='mx-5' onClick={handleNewEnemy}>New Enemy</button>
              <button className='' onClick={handleResetTurn}>Reset Turns</button>
            </>
          }

        </div>
        <div className='battle w-full h-fit flex justify-around items-end my-10'>
          <div id="player" className='w-40 h-full'>
            <Player />
          </div>
          <div id="enemy" className='w-40 h-full'>
              <Enemy />
          </div>
        </div>
        <div id='action-bar' className='w-full h-[40vh] mt-10 flex justify-between'>
          {/* <div>{drawPile.length}</div> */}
          <Energy/>
          <CurrentHand/>
          <EndTurn handleNextTurn={handleNextTurn}/>
          {/* <div>{discardPile.length}</div> */}
        </div>

      </div>
    </div>
  )
}

export default UI
