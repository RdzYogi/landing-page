import warriorStrike from '../../../../assets/game/warrior/cards/warriorStrikeNoText.png'
import warriorBlock from '../../../../assets/game/warrior/cards/warriorBlockNoText.png'
import warriorRage from '../../../../assets/game/warrior/cards/warriorRageNoText.png'
import warriorPeace from '../../../../assets/game/warrior/cards/warriorPeaceNoText.png'

export const warriorCards = {
  'strike': {
    name: "Strike",
    description: ["Deal","damage"],
    numberValues: [6],
    type: "Attack",
    img: warriorStrike,
    cost: 1,
  },
  'block': {
    name: "Block",
    description: ["Gain","block"],
    numberValues: [6],
    type: "Skill",
    img: warriorBlock,
    cost: 1,
  },
  'rage': {
    name: "Rage",
    description: ["All attacks deal double damage, but all block gained is halved"],
    numberValues: [],
    type: "Stance",
    img: warriorRage,
    cost: 0,
  },
  'peace': {
    name: "Peace",
    description: ["All attacks deal half damage, but all block gained is doubled"],
    numberValues: [],
    type: "Stance",
    img: warriorPeace,
    cost: 0,
  },
}
