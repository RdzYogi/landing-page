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

        // set the attributes of the line
        // start at the center of the current node
        const x1 = Math.round(node.offsetLeft + node.offsetWidth)
        const y1 = Math.round(node.offsetTop + node.offsetHeight/2 + window.innerHeight/2)
        const diffX = nextNodePosition.x - nodePosition.x
        const diffY = nextNodePosition.y - nodePosition.y + window.innerHeight/2
        // calculate the end point of the line
        // end at the center of the next node
        const x2 = Math.round(nextNode.offsetLeft + diffX)
        const y2 = Math.round(nextNode.offsetTop + diffY + nextNode.offsetHeight/2)

        // const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        // line.setAttribute('x1', `${x1}`)
        // line.setAttribute('y1', `${Math.round(node.offsetTop + node.offsetHeight/2 + window.innerHeight/2)}`)
        // line.setAttribute('x2', `${Math.round(nextNode.offsetLeft + diffX )}`)
        // line.setAttribute('y2', `${Math.round(nextNode.offsetTop + diffY + nextNode.offsetHeight/2)}`)
        // line.setAttribute('stroke', 'white')
        // // append the line to the SVG
        // svg.appendChild(line)
        // create a wavy line element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', `M${x1} ${y1} C${x1 + 30} ${y1} ${x2 - 30} ${y2} ${x2} ${y2}`)
        path.setAttribute('stroke', 'white')
        path.setAttribute('fill', 'none')
        path.setAttribute('stroke-width', '2')
        // connect the filter to the path
        path.setAttribute('filter', 'url(#pattern-filter)')
        svg.appendChild(path)
      }
      )
    }
  })
  return
}

export default drawPaths
