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
        drawPathFromTo(node, nextNode)
      }
      )
    }
  })
  return
}

export default drawPaths
