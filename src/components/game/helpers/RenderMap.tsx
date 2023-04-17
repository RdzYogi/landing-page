import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import drawPaths from './drawPaths'
import { updateMap } from '../../redux/slices/mapSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';


const deviationForMapNodes = 30
const classForEnemy = "bg-red-400"
const classForRest = "bg-green-400"
const classForCurrentPosition = "bg-yellow-400"
const classForTraveledPaths = "bg-opacity-25"

function RenderMap() {
  const validNodes = useSelector((state: any) => state.map.nodes)
  const paths = useSelector((state: any) => state.map.paths) as string[][]
  const nodeTypes = useSelector((state: any) => state.map.nodeTypes)
  const playerPosition = useSelector((state: any) => state.map.position)
  const traveledPaths = useSelector((state: any) => state.map.traveledPaths)
  const dispatch = useDispatch()
  const [nodes, setNodes] = useState([] as JSX.Element[])

  const drawTraveledPaths = () => {
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLButtonElement>
    if (generatedNodes.length === 0) return
    generatedNodes.forEach((node) => {
      if(traveledPaths.includes(node.dataset.position!)) {
        node.classList.remove("bg-opacity-50")
        node.classList.add(classForTraveledPaths)
      } else{
        if(node.classList.contains(classForTraveledPaths)) node.classList.remove(classForTraveledPaths)
      }
    })
  }

  const handleCurrentPosition = () => {
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLButtonElement>
    if (generatedNodes.length === 0) return
      if(playerPosition === "start") {
        generatedNodes.forEach((node) => {
          // console.log(node.dataset.position)
          if(node.classList.contains(classForCurrentPosition)) {
            node.classList.remove(classForCurrentPosition)
            // node.classList.add("bg-white")
          }
          if (node.dataset.position?.split("-")[1] === "0") {
            node.classList.remove("bg-opacity-50")
            node.disabled = false
          } else {
            if(!node.classList.contains("bg-opacity-50")) node.classList.add("bg-opacity-50")
            node.disabled = true
          }
        })
      } else {
        // If player is not at the start find the next positions
        dispatch(updateMap(playerPosition))
        const nextPositions = [] as string[]
        paths.forEach((path : string[]) => {
          if(path[0] === playerPosition) {
            nextPositions.push(path[1])
          }
        })

        generatedNodes.forEach((node) => {
            // if(!node.classList.contains("bg-white")) node.classList.add("bg-white")
            // node.classList.remove(classForCurrentPosition)
            if(nextPositions.includes(node.dataset.position!)) {
              node.classList.remove("bg-opacity-50")
              node.classList.remove(classForTraveledPaths)
              node.disabled = false
            } else {
              if(!node.classList.contains("bg-opacity-50")) node.classList.add("bg-opacity-50")
              if(node.classList.contains(classForTraveledPaths)) node.classList.remove(classForTraveledPaths)
              node.disabled = true
            }

        })
      }
      // TODO: Add a check to see if the player is at the end of the map and reached the boss

      // TODO: Reset after boss is defeated

  }
  const onNodeSelect = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const position = target.dataset.position
    // console.log(position)
    dispatch(updateMap(position!))
  }

  useEffect(() => {
    setNodes([])
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 12; j++) {
        let type = ""
        if(validNodes.includes(`${i}-${j}`)){
          // nodes.push(
            nodeTypes.forEach((nodeType: string) => {
              if (nodeType[0] === `${i}-${j}`) {
                type = nodeType[1]
              }
            })
            setNodes((prevNodes) => [...prevNodes,
            <div key={i+"-"+j} data-row={i+1} data-column={j+1} className='w-16 h-16 relative'>
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
                  >
                    {type === "normal" ? <FontAwesomeIcon className='pointer-events-none' icon={faSkullCrossbones} /> : null}
                    {type === "rest" ? <FontAwesomeIcon className='pointer-events-none' icon={faCampground} />  : null}
                  </button>

            </div>] )
          // )
        } else {
          // nodes.push(<div key={i+"-"+j} data-row={i+1} data-column={j+1} className='w-16 h-16 relative'></div>)
          setNodes((prevNodes) => [...prevNodes, <div key={i+"-"+j} data-row={i+1} data-column={j+1} className='w-16 h-16 relative'></div>])
        }
      }
  }},[validNodes])

  useEffect(() => {
    if (nodeTypes.length === 0) return
    if (nodes.length === 0 || paths.length === 0) return
    drawPaths(paths)
    drawNodeTypes()
    handleCurrentPosition()
    drawTraveledPaths()
  }, [nodes])

  const drawNodeTypes = () => {
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLButtonElement>
    // console.log("triggered")
    if (generatedNodes.length === 0) return
    generatedNodes.forEach((node) => {
      const nodePosition = node.dataset.position
      if(nodePosition === playerPosition) {
        // console.log(nodePosition, playerPosition)
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
  }

  useEffect(() => {
    drawNodeTypes()
    handleCurrentPosition()
    drawTraveledPaths()
  }, [playerPosition])

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
