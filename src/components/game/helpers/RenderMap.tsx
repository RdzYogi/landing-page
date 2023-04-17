import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import drawPaths from './drawPaths'


const deviationForMapNodes = 30
const classForEnemy = "bg-red-400"
const classForRest = "bg-green-400"
const classForCurrentPosition = "bg-yellow-400"

function RenderMap({onNodeSelect}: {onNodeSelect: (e: React.MouseEvent) => void}) {
  const validNodes = useSelector((state: any) => state.map.nodes)
  const paths = useSelector((state: any) => state.map.paths) as string[][]
  const nodeTypes = useSelector((state: any) => state.map.nodeTypes)
  const playerPosition = useSelector((state: any) => state.map.position)
  const nodes = [] as JSX.Element[]

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 12; j++) {
      if(validNodes.includes(`${i}-${j}`)){
        nodes.push(<div key={i+"-"+j} data-row={i+1} data-column={j+1} className='w-16 h-16 relative'>
            <svg className='absolute -top-[50vh] w-fit h-[100vh] z-20 '>

              {/* <filter id="squiggly">
                <feTurbulence baseFrequency="0.022" numOctaves="3" type="turbulence" seed="10" result="turbulence"></feTurbulence>
                <feDisplacementMap scale="10" in="SourceGraphic" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
              </filter>
              <filter id="pattern-filter">
              <feTurbulence type="turbulence" baseFrequency=".01"
                  numOctaves="2" result="turbulence"/>
              <feDisplacementMap in2="turbulence" in="SourceGraphic"
                  scale="10" xChannelSelector="R" yChannelSelector="G"/>
              </filter> */}
            </svg>
            <button data-position={i+"-"+j} onClick={onNodeSelect}
              className={'node absolute w-[45%] h-[45%] z-30 bg-opacity-50 bg-white rounded-full '}
              style={{top: `${Math.round(Math.random()*deviationForMapNodes)}%`, left: `${Math.round(Math.random()*deviationForMapNodes)}%`}}
              ></button>

        </div>)
      } else {
        nodes.push(<div key={i+"-"+j} data-row={i+1} data-column={j+1} className='w-16 h-16 relative'></div>)
      }
    }
  }
  // check if component is mounted

  useEffect(() => {
    if (nodes.length === 0) return
    drawPaths(paths)
  }, [nodes,paths])

  useEffect(() => {
    if (nodeTypes.length === 0) return
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLButtonElement>
    generatedNodes.forEach((node) => {
      const nodePosition = node.dataset.position
      if(nodePosition === playerPosition) {
        console.log(nodePosition, playerPosition)
        node.classList.remove(classForEnemy)
        node.classList.remove(classForRest)
        node.classList.remove("bg-white")
        node.classList.add(classForCurrentPosition)
      } else {
        nodeTypes.forEach((type: string[]) => {
          if (type[0] === nodePosition) {
            switch (type[1]) {
              case "normal":
                node.classList.remove("bg-white")
                node.classList.remove(classForRest)
                node.classList.add(classForEnemy)
                break;
              case "rest":
                node.classList.remove("bg-white")
                node.classList.add(classForRest)
                node.classList.remove(classForEnemy)
                break;

              default:
                break;
            }
          }
        })
      }
    })
  }, [nodeTypes,playerPosition])

  return (
    <div className='flex overflow-hidden'>
      <div className='grid grid-cols-12 gap-x-6 place-items-center mt-6'>
        {nodes}
      </div>
      <div className='flex items-center ml-4'>
        <div className='boss w-16 h-16 bg-white border-2 border-white'></div>
      </div>
    </div>
  )
}

export default RenderMap
