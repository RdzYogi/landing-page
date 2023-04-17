import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetMap, updateMap, resetPosition } from '../redux/slices/mapSlice'
import RenderMap from './helpers/RenderMap'



function Map() {
  const playerPosition = useSelector((state: any) => state.map.position)
  const calculatedPaths = useSelector((state: any) => state.map.paths)
  const traveledPaths = useSelector((state: any) => state.map.traveledPaths)
  // console.log(playerPosition)
  const dispatch = useDispatch()


  useEffect(() => {
    handleCurrentPosition()
    drawTraveledPaths()
  }, [playerPosition])

  const drawTraveledPaths = () => {
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLButtonElement>
    if (generatedNodes.length === 0) return
    generatedNodes.forEach((node) => {
      if(traveledPaths.includes(node.dataset.position!)) {
        node.classList.remove("bg-opacity-50")
        node.classList.add("bg-opacity-75")
      } else{
        if(node.classList.contains("bg-opacity-75")) node.classList.remove("bg-opacity-75")
      }
    })
  }

  const handleCurrentPosition = () => {
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLButtonElement>
    if (generatedNodes.length === 0) return
      if(playerPosition === "start") {
        generatedNodes.forEach((node) => {
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
        calculatedPaths.forEach((path : string[]) => {
          if(path[0] === playerPosition) {
            nextPositions.push(path[1])
          }
        })

        generatedNodes.forEach((node) => {
          if(nextPositions.includes(node.dataset.position!)) {
            node.classList.remove("bg-opacity-50")
            node.classList.remove("bg-opacity-75")
            node.disabled = false
          } else {
            if(!node.classList.contains("bg-opacity-50")) node.classList.add("bg-opacity-50")
            if(!node.classList.contains("bg-opacity-75")) node.classList.remove("bg-opacity-75")
            node.disabled = true
          }
        })
      }
      // TODO: Add a check to see if the player is at the end of the map and reached the boss

      // TODO: Reset after boss is defeated

  }
  const handleNewMap = () => {
    dispatch(resetMap())
  }

  const handleLvlReset = () => {
    dispatch(resetPosition())
  }

  const onNodeSelect = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const position = target.dataset.position
    console.log(position)
    dispatch(updateMap(position!))
  }

  return (
    <div className='mx-auto w-fit pb-5'>
      <button className='mr-5' onClick={handleNewMap}>New Map</button>
      <button onClick={handleLvlReset}>Reset Level</button>
      <RenderMap onNodeSelect={onNodeSelect}/>
    </div>
  )
}

export default Map
