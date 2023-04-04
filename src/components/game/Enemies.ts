import goblin from "../../assets/enemies/goblin1.png";
import goblin2 from "../../assets/enemies/goblin2.png";
import undead from "../../assets/enemies/undead.png";

export const Enemies =  {
  goblin: {
    name: "Goblin",
    health: 20,
    attack: { min: 8, max: 10},
    defense: { min: 6, max: 8},
    img: goblin,
    special: "",
    tier: 1
  },
  goblin2: {
    name: "Goblin Archer",
    health: 20,
    attack: { min: 10, max: 15},
    defense: { min: 0, max: 0},
    img: goblin2,
    special: "",
    tier: 1
  },

  skeleton: {
    name: "Skeleton",
    health: 25,
    attack: { min: 10, max: 12},
    defense: { min: 15, max: 20},
    img: undead,
    special: "poison",
    tier: 1
  },

  wolf : {
    name: "Werewolf",
    health: 30,
    attack: { min: 12, max: 15},
    defense: { min: 10, max: 12},
  }
}
