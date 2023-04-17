import React, { useEffect, useState } from 'react'
import wizardPortrait from '../../assets/game/wizard/portrait.png'
import warriorPortrait from '../../assets/game/warrior/portrait.png'
import { useSelector } from 'react-redux'

function Player() {
  const [portrait, setPortrait] = useState("")
  // const [currentHealth, setCurrentHealth] = useState(0)
  // const [maxHealth, setMaxHealth] = useState(0)
  // const [block, setBlock] = useState(0)

  const player = useSelector((state: any) => state.player.playerClass)
  const maxHealth = useSelector((state: any) => state.player.maxHealth)
  let currentHealth = useSelector((state: any) => state.player.currentHealth)

  useEffect(() => {
    // console.log("triggered")
    if (player === "warrior") {
      setPortrait(warriorPortrait)

    } else if (player === "wizard") {
      setPortrait(wizardPortrait)
    }
  }, [player])

  useEffect(() => {
    // console.log("triggered")
    const healthBar = document.getElementById('health-bar')
    const healthNumber = document.getElementById('health-number')
    if (healthBar === null || healthNumber === null) return
    const difference = Math.round((currentHealth / maxHealth ) * 100)
    // console.log(difference, currentHealth, maxHealth)
    healthBar.style.backgroundImage = "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) " + difference + "%, rgba(255,0,0,0) " + difference + "%)"
  }, [currentHealth, maxHealth])

  return (
    <div className='relative'>
      <img src={portrait} alt="" />
      <div id="health-bar" className='w-full h-4 text-center  mt-1 rounded-lg border border-gray-500'>
        <h1 id="health-number" className=' text-xs -bottom-0'>{currentHealth + "/" + maxHealth}</h1>
      </div>
    </div>
  )
}

export default Player
