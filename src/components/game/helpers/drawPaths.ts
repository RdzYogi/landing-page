import drawPathFromTo from "./drawPathFromTo";

const chanceForSecondPath = 0.2
function drawPaths(path: string[]) {
  // console.log(path)

  const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLElement>;
  // console.log(generatedNodes)
  generatedNodes.forEach((node) => {
    // Randomize the position of the nodes
    node.style.top = `${Math.round(Math.random()*50)}%`
    node.style.left = `${Math.round(Math.random()*50)}%`
  })

  const nodesAndValidNeighbors = [] as { position: string, neighbors: string[] }[]
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
      nodesAndValidNeighbors.push(node)
    }
  })


  // Generate the paths
  const allPathsToValidNeighbors = [] as string[][]
  nodesAndValidNeighbors.forEach((route) => {
    const node = document.querySelector(`[data-position="${route.position}"]`) as HTMLElement
    const svg = node.parentElement?.querySelector('svg')
    if (!svg) return
    svg.innerHTML = ''
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
      if(sameEndNodes.length > 0 && sameStartNodes.length > 0 && !((Math.random() < chanceForSecondPath) && lengthOfPath === 0)) {
        allPathsToValidNeighbors.splice(index, 1)
      }
      index--
    }

    allPathsToValidNeighbors.forEach((path) => {
    drawPathFromTo(path[0], path[1])
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
