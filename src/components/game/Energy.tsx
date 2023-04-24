import React, { useEffect, useState } from 'react'
import warriorEnergy from '../../assets/game/warrior/WarriorEnergy.png'
import { useSelector } from 'react-redux'

function Energy() {
  const currentMana = useSelector((state: any) => state.player.currentMana)
  const maxMana = useSelector((state: any) => state.player.maxMana)
  const [valueToDisplay, setValueToDisplay] = useState("")
  useEffect(() => {
    setValueToDisplay(`${currentMana}/${maxMana}`)
  }, [currentMana, maxMana])
  return (
    <div className='relative h-fit self-end'>
      <img src={warriorEnergy} alt="warrior energy" className='w-24 '/>
      <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-2xl'>{valueToDisplay}</p>
    </div>
  )
}

export default Energy
