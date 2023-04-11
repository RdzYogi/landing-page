import drawPathFromTo from "./drawPathFromTo";

const chanceForSecondPath = 0.2
function drawPaths(path: string[]) {
  console.log(path)

  const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLElement>;
  // console.log(generatedNodes)
  generatedNodes.forEach((node) => {
    // Randomize the position of the nodes
    node.style.top = `${Math.round(Math.random()*50)}%`
    node.style.left = `${Math.round(Math.random()*50)}%`
  })

  const possibleRoutes = [] as { position: string, neighbors: string[] }[]
  path.forEach((position) => {
    const [row, column] = position.split('-').map(Number)
    // Save the node and all possible valid neighbors
    const node = { position, neighbors: [] as string[] };
    if (column < 11) {
      // Check the neighbors to the right
      for (let i = 0; i < 6; i++) {
        const neighbor = `${i}-${column + 1}`
        // Check if the neighbor exists in the path and the row is within 2 of the current node
        if (path.includes(neighbor) && Math.abs(row - i) <= 2) {
          node.neighbors.push(neighbor)
        }
      }
      possibleRoutes.push(node)
    }
  })

  possibleRoutes.forEach((route) => {
    const node = document.querySelector(`[data-position="${route.position}"]`) as HTMLElement
    const svg = node.parentElement?.querySelector('svg')
    if (!svg) return
    svg.innerHTML = ''
    route.neighbors.forEach((neighbor) => {
      const nextNode = document.querySelector(`[data-position="${neighbor}"]`) as HTMLElement
      drawPathFromTo(node, nextNode)
    })
  })




  // // Draw the path
  // generatedNodes.forEach((node) => {
  //   // find the svg element that has the same parent as the node
  //   const svg = node.parentElement?.querySelector('svg')
  //   if (svg) {
  //     // find the next nodes in the path
  //     // by checking the data-position attribute
  //     const currentPosition = node.dataset.position?.split('-')[1]
  //     // console.log(currentPosition)
  //     if (currentPosition === '11') return
  //     const nextNodes = [] as HTMLElement[]
  //     for (let i = 0; i < 6; i++) {
  //       const possibleNextNode = document.querySelector(`[data-position="${i}-${Number(currentPosition) + 1}"]`) as HTMLElement
  //       if (possibleNextNode) {
  //         nextNodes.push(possibleNextNode)
  //       }
  //     }

  //     // console.log(nextNodes)
  //     // map over the next nodes and draw a line to them
  //     svg.innerHTML = ''

  //     nextNodes.forEach((nextNode) => {
  //       drawPathFromTo(node, nextNode)
  //     }
  //     )
  //   }
  // })
  return
}

export default drawPaths
