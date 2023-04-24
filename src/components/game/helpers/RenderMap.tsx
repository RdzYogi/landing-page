import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import drawPaths from './drawPaths'
import { resetMap, updateMap } from '../../redux/slices/mapSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDungeon, faSkullCrossbones, faTent } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import { drawCards, generateDrawPile, resetTurn, resetWarriorDecks, setGameState } from '../../redux/slices/playerSlice';


const deviationForMapNodes = 30
const classForEnemy = "bg-red-400"
const classForRest = "bg-green-400"
const classForCurrentPosition = "bg-yellow-400"
const classForTraveledPaths = "bg-opacity-25"
const scaleForSelectableNodes = "1.4"

function RenderMap() {
  const gameState = useSelector((state: any) => state.player.gameState)
  const validNodes = useSelector((state: any) => state.map.nodes)
  const paths = useSelector((state: any) => state.map.paths) as string[][]
  const nodeTypes = useSelector((state: any) => state.map.nodeTypes)
  const playerPosition = useSelector((state: any) => state.map.position)
  const traveledPaths = useSelector((state: any) => state.map.traveledPaths)
  const dispatch = useDispatch()
  const [nodes, setNodes] = useState([] as JSX.Element[])
  const [loaded, setLoaded] = useState(false)

  const drawTraveledPaths = () => {
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLButtonElement>
    if (generatedNodes.length === 0) return
    generatedNodes.forEach((node) => {
      // condition for last node
      if(node.dataset.position === playerPosition) {
        node.style.scale="1.2"
        node.classList.remove("bg-opacity-50")
      }else{
        if(traveledPaths.includes(node.dataset.position!)) {
          node.classList.remove("bg-opacity-50")
          node.classList.remove(classForEnemy)
          node.classList.remove(classForRest)
          node.classList.add(classForTraveledPaths)
          node.classList.add(classForCurrentPosition)
        } else{
          if(node.classList.contains(classForTraveledPaths)) node.classList.remove(classForTraveledPaths)
        }
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
            node.style.scale = scaleForSelectableNodes
            node.disabled = false
          } else {
            if(!node.classList.contains("bg-opacity-50")) node.classList.add("bg-opacity-50")
            node.disabled = true
            node.style.scale="1"
          }
        })
      } else {
        // If player is not at the start find the next positions
        // dispatch(updateMap(playerPosition))
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
              node.style.scale = scaleForSelectableNodes
            } else {
              if(!node.classList.contains("bg-opacity-50")) node.classList.add("bg-opacity-50")
              if(node.classList.contains(classForTraveledPaths)) node.classList.remove(classForTraveledPaths)
              node.disabled = true
              node.style.scale = "1"
            }

        })
      }
      // TODO: Add a check to see if the player is at the end of the map and reached the boss

      if(playerPosition.split("-")[1] === "11") {
        // console.log("Boss fight")
        const boss = document.querySelector('.boss') as HTMLButtonElement
        boss.classList.remove("opacity-50")
        boss.disabled = false
      }else{
        const boss = document.querySelector('.boss') as HTMLButtonElement
        if (!boss.classList.contains("opacity-50")) boss.classList.add("opacity-50")
        boss.disabled = true
      }

      // TODO: Reset after boss is defeated

  }
  const onNodeSelect = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const position = target.dataset.position
    // console.log(position)
    dispatch(updateMap(position!))
    dispatch(resetTurn())
    dispatch(setGameState("combat"))
    dispatch(resetWarriorDecks())
    dispatch(generateDrawPile())
    dispatch(drawCards())
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
                    {type === "rest" ? <FontAwesomeIcon className='pointer-events-none' icon={faTent} /> : null}

                  </button>

            </div>] )
          // )
        } else {

          setNodes((prevNodes) => [...prevNodes, <div key={i+"-"+j} data-row={i+1} data-column={j+1} className='w-16 h-16 relative'></div>])
        }
      }
      setLoaded(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }},[validNodes])

  useEffect(() => {
    if (nodeTypes.length === 0) return
    if (!loaded) return
    if (nodes.length === 0 || paths.length === 0) return
    if(gameState !== "minimap") return
    setTimeout(() => {
      drawPaths(paths)
      drawNodeTypes()
      handleCurrentPosition()
      drawTraveledPaths()
    }, 10);
    // console.log("nodes:",validNodes,"paths:",paths,"nodeTypes:",nodeTypes)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes,gameState])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPosition])

  const handleBoss = () => {
    dispatch(resetMap())
  }
  return (
    <div className='flex overflow-hidden'>
      <div className='grid grid-cols-12 gap-x-6 place-items-center mt-6 ml-2'>
        {nodes}
      </div>
      <div className='flex items-center ml-10'>
        <button onClick={handleBoss} className='boss flex w-16 h-16 bg-red-600 rounded-full justify-center z-50 opacity-50' >
          <FontAwesomeIcon className='text-4xl my-auto' icon={faDungeon} />
        </button>
      </div>
    </div>
  )
}

export default RenderMap
