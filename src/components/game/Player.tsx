import React, { useEffect, useState } from 'react'
import wizardPortrait from '../../assets/game/wizard/portrait.png'
import warriorPortrait from '../../assets/game/warrior/portrait.png'

function Player({player, damage}: {player: string, damage: number | 0}) {
  const [health, setHealth] = useState(100)
  const [portrait, setPortrait] = useState("")

  useEffect(() => {
    if (player === "warrior") {
      setPortrait(warriorPortrait)
    } else if (player === "wizard") {
      setPortrait(wizardPortrait)
    }
  }, [player, damage])
  return (
    <div>
      <img src={portrait} alt="" />
    </div>
  )
}

export default Player
