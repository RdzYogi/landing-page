import React from 'react'

function drawPaths(path: string[]) {
  const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLElement>;
  generatedNodes.forEach((node) => {
    // Randomize the position of the nodes
    node.style.top = `${Math.round(Math.random()*50)}%`
    node.style.left = `${Math.round(Math.random()*50)}%`
    // Draw the path
    console.log(node)
  })




  return
}

export default drawPaths
