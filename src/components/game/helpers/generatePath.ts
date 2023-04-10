// Generate a random path for the player to follow
const probabilityOfPath = 0.5
function generatePath() {
  const path = []
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 12; j++) {
      // logic for deciding if a tile is a path or not
      if (Math.random() > probabilityOfPath) {
        path.push(`${i}-${j}`)
      }
    }
  }
  return path
}

export default generatePath
