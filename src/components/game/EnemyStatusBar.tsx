import React from 'react'
import { useSelector } from 'react-redux'
import blockImg from '../../assets/game/buffs/BlockThumb.png'

function EnemyStatusBar() {
  const enemyBlock = useSelector((state: any) => state.enemy.enemyBlock)
  return (
    <div className='flex'>
      <div className={'relative ' + (Number(enemyBlock) === 0 ? "hidden": "")}>
        <img src={blockImg} alt="block" className='w-8'/>
        <p className='text-xs absolute inset-0 flex items-center justify-center'>{enemyBlock}</p>
      </div>
    </div>
  )
}

export default EnemyStatusBar
