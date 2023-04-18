import { Enemies } from "../Enemies"
type Enemy = {
  name: string;
  maxHealth: number;
  currentHealth: number;
  attack: {
    min: number;
    max: number;
  };
  defense: {
    min: number;
    max: number;
  };
  img: string;
  special: string[];
  tier: number;
};

function enemyPicker(playerPosition: string) : Enemy {
  const level = Number(playerPosition.split("-")[1]) + 1
  const tier = Math.floor(level / 3) + 1
  const enemies = Object.keys(Enemies)
  const enemy = enemies[Math.floor(Math.random() * enemies.length)] as keyof typeof Enemies
  const enemyObj = Enemies[enemy]
  // console.log(enemyObj.tier,tier)
  if (enemyObj.tier > tier) {
    return enemyPicker(playerPosition)
  }
  return enemyObj
}

export default enemyPicker
