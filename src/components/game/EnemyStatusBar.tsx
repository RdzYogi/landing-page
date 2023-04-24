import React from 'react'
import { useSelector } from 'react-redux'

function EnemyStatusBar() {
  const enemyBlock = useSelector((state: any) => state.enemy.block)
  return (
    <div>EnemyStatusBar</div>
  )
}

export default EnemyStatusBar
