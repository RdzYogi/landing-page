import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import blockImg from '../../assets/game/buffs/BlockThumb.png'
import peace from '../../assets/game/buffs/PeaceThumb.png'
import rage from '../../assets/game/buffs/RageThumb.png'

function PlayerStatusBar() {
  const playerBlock = useSelector((state: any) => state.player.block)
  const warriorStance = useSelector((state: any) => state.player.warriorStance)
  const [stanceVisible, setStanceVisible] = useState(false)
  const [stanceImg, setStanceImg] = useState("")
  useEffect(() => {
    switch (warriorStance) {
      case "peace":
        setStanceImg(peace)
        setStanceVisible(true)
        break;
      case "rage":
        setStanceImg(rage)
        setStanceVisible(true)
        break;

      default:
        setStanceVisible(false)
        break;
    }
  }, [warriorStance])
  return (
    <div className='flex'>
      <div className='relative'>
        <img src={blockImg} alt="block" className='w-8'/>
        <p className='text-xs absolute inset-0 flex items-center justify-center'>{playerBlock}</p>
      </div>
      <div className='flex items-center justify-center'>
        <img src={stanceImg} alt="stance" className={`w-6 ${stanceVisible ? "" : "hidden"}`}/>
      </div>
    </div>
  )
}

export default PlayerStatusBar
