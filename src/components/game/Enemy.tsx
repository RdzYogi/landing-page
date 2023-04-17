import React, { useEffect, useState } from 'react'
type EnemyObject = {
  enemy:{name: string;
  health: number;
  attack: {
    min: number;
    max: number;
  };
  defense: {
    min: number;
    max: number;
  };
  img: string;
  special: string[];
  tier: number;}
};

function Enemy(enemy: EnemyObject, turn: number, receivedDamage: number) {
  const [maxHealth, setMaxHealth] = useState(0)
  const [currentHealth, setCurrentHealth] = useState(0)
  useEffect(() => {
    setMaxHealth(enemy.enemy.health)
    setCurrentHealth(enemy.enemy.health)
    // console.log(enemy.enemy)

  }, [enemy])
  useEffect(() => {
    const healthBar = document.getElementById('enemy-health-bar')
    const healthNumber = document.getElementById('enemy-health-number')
    if (healthBar === null || healthNumber === null) return
    const difference = Math.round((currentHealth / maxHealth ) * 100)
    // console.log(difference, currentHealth, maxHealth)
    healthBar.style.backgroundImage = "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) " + difference + "%, rgba(255,0,0,0) " + difference + "%)"
  }, [currentHealth, maxHealth])
  useEffect(() => {}, [turn])
  return (
    <div className='relative'>
      <img src={enemy.enemy.img} alt="" />
      <div id="enemy-health-bar" className='w-full h-4 text-center mt-1 rounded-lg border border-gray-500'>
        <h1 id="enemy-health-number" className=' text-xs -bottom-0'>{currentHealth + "/" + maxHealth}</h1>
      </div>
    </div>
  )
}

export default Enemy
