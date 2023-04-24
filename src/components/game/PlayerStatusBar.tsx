import React from 'react'
import { useSelector } from 'react-redux'
import blockImg from '../../assets/game/buffs/BlockThumb.png'

function PlayerStatusBar() {
  const playerBlock = useSelector((state: any) => state.player.block)
  return (
    <div className='flex'>
      <div className='relative'>
        <img src={blockImg} alt="block" className='w-6 mb-1'/>
        <p className='text-xs absolute top-[20%] left-[35%] w-fit'>{playerBlock}</p>
      </div>
    </div>
  )
}

export default PlayerStatusBar
