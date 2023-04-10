// Generate a random path for the player to follow
const probabilityOfExtraNode = 0.2
function generatePath() {
  const path = []

  for (let j = 0; j < 12; j++) {
    const oneSurePath = Math.round(Math.random()*5)
    for (let i = 0; i < 6; i++) {
      // logic for deciding if a tile is a path or not
      if (i === oneSurePath) {
        path.push(`${i}-${j}`)
      }else if (Math.random() < probabilityOfExtraNode) {
        path.push(`${i}-${j}`)
      }
    }
  }
  for (let i = 0; i < 6; i++) {
    let eachRowHasPath = false
    for (let j = 0; j < 12; j++) {
      eachRowHasPath = eachRowHasPath || path.includes(`${i}-${j}`)
    }
  }


  return path
}


export default generatePath
