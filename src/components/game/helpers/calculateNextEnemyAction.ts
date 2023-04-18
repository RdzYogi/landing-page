

function calculateNextEnemyAction(special: string[]) {
  if (special.length === 0) {
    if(Math.random() < 0.5) {
      return "attack"
    } else {
      return "defend"
    }
  } else{
    const specialAction = special[Math.floor(Math.random() * special.length)]
    const randomDraw = Math.random()
    if(randomDraw < 0.2) {
      return "attack"
    } else if (randomDraw > 0.8) {
      return "defend"
    } else {
      return specialAction
    }
  }
}

export default calculateNextEnemyAction
