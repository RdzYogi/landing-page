import React, { useEffect, useState } from 'react'
import wizardPortrait from '../../assets/game/wizard/portrait.png'
import warriorPortrait from '../../assets/game/warrior/portrait.png'

function Player({player, damage}: {player: string, damage: number | 0}) {
  const [portrait, setPortrait] = useState("")
  const [health, setHealth] = useState(0)

  useEffect(() => {
    if (player === "warrior") {
      setPortrait(warriorPortrait)
      setHealth(100)
    } else if (player === "wizard") {
      setPortrait(wizardPortrait)
      setHealth(75)
    }
  }, [player, damage])
  return (
    <div>
      <img src={portrait} alt="" />
    </div>
  )
}

export default Player
