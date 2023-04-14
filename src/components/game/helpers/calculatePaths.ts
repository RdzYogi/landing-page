

const chanceForSecondPath = 0.5
function calculatePaths(nodes: string[]) {

  const nodesAndValidNeighbors = [] as { position: string, neighbors: string[] }[]
  nodes.forEach((position) => {
    const [row, column] = position.split('-').map(Number)
    // Save the node and all possible valid neighbors
    const node = { position, neighbors: [] as string[] };
    if (column < 11) {
      // Check the neighbors to the right
      for (let i = 0; i < 6; i++) {
        const neighbor = `${i}-${column + 1}`
        // Check if the neighbor exists in the path and the row is within 2 of the current node
        if (nodes.includes(neighbor) && Math.abs(row - i) <= 2) {
          node.neighbors.push(neighbor)
        }
      }
      nodesAndValidNeighbors.push(node)
    }
  })


  // Generate the paths
  const allPathsToValidNeighbors = [] as string[][]
  nodesAndValidNeighbors.forEach((route) => {
    // const node = document.querySelector(`[data-position="${route.position}"]`) as HTMLElement
    // const svg = node.parentElement?.querySelector('svg')
    // if (!svg) return
    // svg.innerHTML = ''
    route.neighbors.forEach((neighbor) => {
      // drawPathFromTo(route.position, neighbor)
      allPathsToValidNeighbors.push([route.position, neighbor])
    })
  })

  // console.log(allPathsToValidNeighbors)

  // Filter out paths from nodes that have more than 2 paths leading to them

    // console.log(allPathsToValidNeighbors)
    allPathsToValidNeighbors.sort((a, b) => {
      const diffA = Math.abs(parseInt(a[0].split('-')[0]) - parseInt(a[1].split('-')[0]));
      const diffB = Math.abs(parseInt(b[0].split('-')[0]) - parseInt(b[1].split('-')[0]));
      return diffA - diffB;
    })
    // allPathsToValidNeighbors.reverse()
    // console.log("ordered",allPathsToValidNeighbors)

    let index = allPathsToValidNeighbors.length - 1

    while (index >= 0) {
      const sameEndNodes = allPathsToValidNeighbors.filter((path) => path[1] === allPathsToValidNeighbors[index][1] && path[0] !== allPathsToValidNeighbors[index][0])
      const sameStartNodes = allPathsToValidNeighbors.filter((path) => path[0] === allPathsToValidNeighbors[index][0] && path[1] !== allPathsToValidNeighbors[index][1])

      const lengthOfPath = Math.abs(parseInt(allPathsToValidNeighbors[index][0].split('-')[0]) - parseInt(allPathsToValidNeighbors[index][1].split('-')[0]))
      if(sameEndNodes.length > 0 && sameStartNodes.length > 0 && !((Math.random() < chanceForSecondPath) && lengthOfPath < 1)) {
        allPathsToValidNeighbors.splice(index, 1)
      }
      index--
    }
  return allPathsToValidNeighbors
}

export default calculatePaths
