// Generate a random path for the player to follow
const probabilityOfExtraNode = 0.4
function generatePath() {
  const path = []

  for (let j = 0; j < 12; j++) {
    // One node will always be between 0 and 1
    const oneSurePath = Math.round(Math.random()*1)
    // The other node will always be between 4 and 5
    let twoSurePath = Math.round(Math.random()*1 + 4)
    while (twoSurePath === oneSurePath) {
      twoSurePath = Math.round(Math.random()*5)
    }


    for (let i = 0; i < 6; i++) {
      // logic for deciding if a tile is a path or not
      if (i === oneSurePath ) {
        path.push(`${i}-${j}`)
      }else if(i === twoSurePath) {
        path.push(`${i}-${j}`)
      }
      // Logic for extra nodes between 2 and 4
      else if (Math.random() < probabilityOfExtraNode) {
        path.push(`${i}-${j}`)
      }
    }
  }



  return path
}


export default generatePath
