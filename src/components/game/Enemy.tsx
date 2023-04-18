import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Enemy() {
  const [enemyLoaded, setEnemyLoaded] = useState(false)
  const playerPosition = useSelector((state: any) => state.map.position)
  const enemy = useSelector((state: any) => state.enemy.currentEnemy)
  const currentHealth = useSelector((state: any) => state.enemy.currentEnemy.currentHealth)
  const maxHealth = useSelector((state: any) => state.enemy.currentEnemy.maxHealth)
  // const currentHealth
  useEffect(() => {
    // console.log(enemy.img)
    setEnemyLoaded(true)
  }, [])
  useEffect(() => {
    // const newEnemy = enemyPicker(playerPosition)
    // dispatch(setCurrentEnemy(newEnemy))
  }, [playerPosition])
  useEffect(() => {
    const healthBar = document.getElementById('enemy-health-bar')
    const healthNumber = document.getElementById('enemy-health-number')
    if (healthBar === null || healthNumber === null) return
    const difference = Math.round((currentHealth / maxHealth ) * 100)
    // console.log(difference, currentHealth, maxHealth)
    healthBar.style.backgroundImage = "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) " + difference + "%, rgba(255,0,0,0) " + difference + "%)"
  }, [currentHealth, maxHealth, enemyLoaded])


  return (
    <div className='relative'>
      {enemyLoaded &&
      <>
        <img src={enemy.img} alt={enemy.name} />
        <div id="enemy-health-bar" className='w-full h-4 text-center mt-1 rounded-lg border border-gray-500'>
          <h1 id="enemy-health-number" className=' text-xs -bottom-0'>{currentHealth + "/" + maxHealth}</h1>
        </div>
      </>
      }
    </div>
  )
}

export default Enemy
