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

function enemyPicker(level: number) : Enemy {
  const enemies = Object.keys(Enemies)
  const enemy = enemies[Math.floor(Math.random() * enemies.length)] as keyof typeof Enemies
  const enemyObj = Enemies[enemy]
  if (enemyObj.tier > (level)) {
    return enemyPicker(level)
  }
  return enemyObj
}

export default enemyPicker
