

function drawPathFromTo(node: HTMLElement, nextNode: HTMLElement) {
  const svg = node.parentElement?.querySelector('svg')
  if (!svg) return
  // svg.innerHTML = ''
  if(nextNode.parentElement === null || node.parentElement === null) return
  const nextNodePosition = nextNode.parentElement.getBoundingClientRect()
  const nodePosition = node.parentElement.getBoundingClientRect()
  // create a line element

  // set the attributes of the line
  // start at the center of the current node
  const x1 = (node.offsetLeft + node.offsetWidth)
  const y1 = (node.offsetTop + node.offsetHeight/2 + window.innerHeight/2)
  const diffX = nextNodePosition.x - nodePosition.x
  const diffY = nextNodePosition.y - nodePosition.y + window.innerHeight/2
  // calculate the end point of the line
  // end at the center of the next node
  const x2 = nextNode.offsetLeft + diffX
  const y2 = (nextNode.offsetTop + diffY + nextNode.offsetHeight/2)

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', `M${x1} ${y1} C${x1 + 30} ${y1} ${x2 - 30} ${y2} ${x2} ${y2}`)
  path.setAttribute('stroke', 'white')
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke-width', '2')
  // connect the filter to the path
  // path.setAttribute('filter', 'url(#pattern-filter)')
  svg.appendChild(path)
  return
}

export default drawPathFromTo
