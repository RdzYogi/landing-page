import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, reset } from '../redux/slices/levelSlice'
import { resetMap } from '../redux/slices/mapSlice'
import RenderMap from './helpers/RenderMap'



function Map() {
  const playerPosition = useSelector((state: any) => state.level.position)
  const calculatedPaths = useSelector((state: any) => state.map.paths)
  // console.log(playerPosition)
  const dispatch = useDispatch()


  useEffect(() => {
    handleCurrentPosition()
  }, [playerPosition])


  const handleCurrentPosition = () => {
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLElement>
    if (generatedNodes.length === 0) return
      if(playerPosition === "start") {
        generatedNodes.forEach((node) => {
          if (node.dataset.position?.split("-")[1] === "0") {
            node.classList.remove("bg-opacity-50")
          } else {
            if(!node.classList.contains("bg-opacity-50")) node.classList.add("bg-opacity-50")
          }
        })
      } else {
        // If player is not at the start find the next positions
        const nextPositions = [] as string[]
        calculatedPaths.forEach((path : string[]) => {
          if(path[0] === playerPosition) {
            nextPositions.push(path[1])
          }
        })

        generatedNodes.forEach((node) => {
          if(nextPositions.includes(node.dataset.position!)) {
            node.classList.remove("bg-opacity-50")
          } else {
            if(!node.classList.contains("bg-opacity-50")) node.classList.add("bg-opacity-50")
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
    dispatch(reset())
  }

  const onNodeSelect = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const position = target.dataset.position
    console.log(position)
    dispatch(increment(position!))
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
