import drawPathFromTo from "./drawPathFromTo";

const chanceForSecondPath = 0.2
const deviationForMapNodes = 30
function drawPaths(path: string[]) {
  // console.log(path)

  const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLElement>;
  // console.log(generatedNodes)
  generatedNodes.forEach((node) => {
    // Randomize the position of the nodes
    node.style.top = `${Math.round(Math.random()*deviationForMapNodes)}%`
    node.style.left = `${Math.round(Math.random()*deviationForMapNodes)}%`
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

    // Draw path from the last node to the boss

    // const boss = document.querySelector('.boss') as HTMLElement
    generatedNodes.forEach((node) => {
      // console.log(node.dataset.position?.split('-')[1])
      if (node.dataset.position?.split('-')[1] === '11') {
        const nextNode = document.querySelector(`.boss`) as HTMLElement
        const svg = node.parentElement?.querySelector('svg')
        if (!svg) return
        svg.innerHTML = ''
        if(nextNode.parentElement === null || node.parentElement === null) return
        const nextNodePosition = nextNode.parentElement.getBoundingClientRect()
        const nodePosition = node.parentElement.getBoundingClientRect()
        // create a line element

        // set the attributes of the line
        // start at the center of the current node
        const x1 = (node.offsetLeft + node.offsetWidth)
        const y1 = (node.offsetTop + node.offsetHeight/2 + window.innerHeight/2)
        const diffY = nextNodePosition.y - nodePosition.y + window.innerHeight/2
        // calculate the end point of the line
        // end at the center of the next node
        const x2 = nextNode.offsetLeft - node.parentElement.offsetLeft
        const y2 = (nextNode.offsetTop + diffY - nextNode.parentElement.offsetTop + nextNode.offsetHeight/2)

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', `M${x1} ${y1} C${x1 + 30} ${y1} ${x2 - 30} ${y2} ${x2} ${y2}`)
        path.setAttribute('stroke', 'white')
        path.setAttribute('fill', 'none')
        path.setAttribute('stroke-width', '2')
        // connect the filter to the path
        // path.setAttribute('filter', 'url(#pattern-filter)')
        svg.appendChild(path)
      }
    })

  return
}

export default drawPaths
