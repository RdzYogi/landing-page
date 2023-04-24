import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import enemyIntentAttack from '../../../assets/game/enemies/intents/EnemyIntentAttack.png'
import enemyIntentDefend from '../../../assets/game/enemies/intents/EnemyIntentDefence.png'
import enemyIntentSpecial from '../../../assets/game/enemies/intents/EnemyIntentSpecial.png'

function NextEnemyAction() {
  const nextEnemyAction = useSelector((state: any) => state.enemy.nextEnemyAction)
  const minEnemyDamage = useSelector((state: any) => state.enemy.currentEnemy.attack.min)

  const minEnemyDefense = useSelector((state: any) => state.enemy.currentEnemy.defense.min)

  const [imageString, setImageString] = useState("")
  const [numberValue, setNumberValue] = useState(0)
  useEffect(() => {
    switch (nextEnemyAction) {
      case "attack":
        setImageString(enemyIntentAttack)
        setNumberValue(minEnemyDamage)
        break;

      case "defend":
        // console.log(minEnemyDefense)
        setImageString(enemyIntentDefend)
        setNumberValue(minEnemyDefense)
        break;

      default:
        setImageString(enemyIntentSpecial)
        setNumberValue(0)
        break;
    }
  }, [nextEnemyAction])
  return (
    <div className='flex justify-center items-center'>
      <img src={imageString} alt="enemy intent" className='w-6 mb-1'/>
      {(numberValue !== 0) && <p className='text-sm ml-1 '>{numberValue}</p>}
    </div>
  )
}

export default NextEnemyAction
