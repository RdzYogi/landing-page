const chanceForSecondPath = 0.2
function drawPaths() {
  const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLElement>;
  // console.log(generatedNodes)
  generatedNodes.forEach((node) => {
    // Randomize the position of the nodes
    node.style.top = `${Math.round(Math.random()*50)}%`
    node.style.left = `${Math.round(Math.random()*50)}%`
  })

  // Draw the path
  generatedNodes.forEach((node) => {
    // find the svg element that has the same parent as the node
    const svg = node.parentElement?.querySelector('svg')
    if (svg) {
      // find the next nodes in the path
      // by checking the data-position attribute
      const currentPosition = node.dataset.position?.split('-')[1]
      // console.log(currentPosition)
      if (currentPosition === '11') return
      const nextNodes = [] as HTMLElement[]
      for (let i = 0; i < 6; i++) {
        const possibleNextNode = document.querySelector(`[data-position="${i}-${Number(currentPosition) + 1}"]`) as HTMLElement
        if (possibleNextNode) {
          nextNodes.push(possibleNextNode)
        }
      }

      // console.log(nextNodes)
      // map over the next nodes and draw a line to them
      svg.innerHTML = ''

      nextNodes.forEach((nextNode) => {
        if(nextNode.parentElement === null || node.parentElement === null) return
        const nextNodePosition = nextNode.parentElement.getBoundingClientRect()
        const nodePosition = node.parentElement.getBoundingClientRect()
        // create a line element
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        // set the attributes of the line
        // start at the center of the current node
        line.setAttribute('x1', `${Math.round(node.offsetLeft + node.offsetWidth)}`)
        line.setAttribute('y1', `${Math.round(node.offsetTop + node.offsetHeight/2 + window.innerHeight/2)}`)

        // calculate the end point of the line
        // end at the center of the next node
        const diffX = nextNodePosition.x - nodePosition.x
        const diffY = nextNodePosition.y - nodePosition.y + window.innerHeight/2

        line.setAttribute('x2', `${Math.round(nextNode.offsetLeft + diffX )}`)
        line.setAttribute('y2', `${Math.round(nextNode.offsetTop + diffY + nextNode.offsetHeight/2)}`)
        line.setAttribute('stroke', 'white')
        // append the line to the SVG
        svg.appendChild(line)
      }
      )
    }
  })
  return
}

export default drawPaths
