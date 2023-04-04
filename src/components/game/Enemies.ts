import goblin from "../../assets/game/enemies/goblin1.png";
import goblin2 from "../../assets/game/enemies/goblin2.png";
import undead from "../../assets/game/enemies/undead.png";
import wolf from "../../assets/game/enemies/wolf1.png";
import orc from "../../assets/game/enemies/orc1.png";
import leech from "../../assets/game/enemies/leech.png";
import demon from "../../assets/game/enemies/demon1.png";
import iceSpirit from "../../assets/game/enemies/iceSpirit.png";
import waterSpirit from "../../assets/game/enemies/waterSpirit.png";
import dragon from "../../assets/game/enemies/dragon.png";
type EnemyType = 'goblin' | 'goblin2' | 'dragon' | 'skeleton' | 'wolf' | 'orc' | 'leech' | 'demon' | 'iceSpirit' | 'waterSpirit';

type EnemyData = {
  [key in EnemyType]: {
    name: string;
    health: number;
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
};

export const Enemies : EnemyData =  {
  'goblin': {
    name: "Goblin",
    health: 20,
    attack: { min: 8, max: 10},
    defense: { min: 6, max: 8},
    img: goblin,
    special: [],
    tier: 1
  },
  'goblin2': {
    name: "Goblin Archer",
    health: 20,
    attack: { min: 10, max: 15},
    defense: { min: 0, max: 0},
    img: goblin2,
    special: [],
    tier: 1
  },

  'skeleton': {
    name: "Skeleton",
    health: 25,
    attack: { min: 10, max: 12},
    defense: { min: 15, max: 20},
    img: undead,
    special: ["poison"],
    tier: 1
  },

  'wolf' : {
    name: "Werewolf",
    health: 50,
    attack: { min: 12, max: 15},
    defense: { min: 10, max: 12},
    img: wolf,
    special: ["bleed"],
    tier: 1
  },

  'orc':{
    name: "Orc",
    health: 80,
    attack: { min: 15, max: 20},
    defense: { min: 10, max: 15},
    img: orc,
    special: ["bleed"],
    tier: 2
  },

  'leech':{
    name: "Leech",
    health: 60,
    attack: { min: 15, max: 25},
    defense: { min: 0, max: 0},
    img: leech,
    special: ["poison2"],
    tier: 2
  },
  'demon':{
    name: "Demon",
    health: 250,
    attack: { min: 20, max: 30},
    defense: { min: 20, max: 30},
    img: demon,
    special: ["enrage"],
    tier: 3
  },
  'iceSpirit':{
    name: "Ice Spirit",
    health: 200,
    attack: { min: 20, max: 30},
    defense: { min: 20, max: 30},
    img: iceSpirit,
    special: ["defense"],
    tier: 3
  },
  'waterSpirit':{
    name: "Water Spirit",
    health: 200,
    attack: { min: 20, max: 30},
    defense: { min: 20, max: 30},
    img: waterSpirit,
    special: ["attackDown", "defenseDown"],
    tier: 3
  },
  'dragon':{
    name: "Dragon",
    health: 500,
    attack: { min: 30, max: 40},
    defense: { min: 30, max: 40},
    img: dragon,
    special: ["attackUp", "defenseUp", "enrage"],
    tier: -1
  }
}
