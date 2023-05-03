import drawPathFromTo from "./drawPathFromTo";

// const chanceForSecondPath = 0.6

function drawPaths(paths: string[][]) {
  // console.log(path)

  const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLElement>;
  generatedNodes.forEach((node) => {
    const svg = node.parentElement?.querySelector('svg')
    if (!svg) return
    svg.innerHTML = ''
  })

    paths.forEach((path) => {
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
        path.setAttribute('stroke-dasharray', '4 6 7 6')
        // connect the filter to the path
        // path.setAttribute('filter', 'url(#pattern-filter)')
        svg.appendChild(path)
      }
    })

  return
}

export default drawPaths
