import React from 'react'
import { useSelector } from 'react-redux'
import blockImg from '../../assets/game/buffs/BlockThumb.png'

function PlayerStatusBar() {
  const playerBlock = useSelector((state: any) => state.player.block)
  return (
    <div className='flex'>
      <div className='relative'>
        <img src={blockImg} alt="block" className='w-8'/>
        <p className='text-xs absolute inset-0 flex items-center justify-center'>{playerBlock}</p>
      </div>
    </div>
  )
}

export default PlayerStatusBar
