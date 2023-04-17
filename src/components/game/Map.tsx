import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, reset } from '../redux/slices/levelSlice'
import { resetMap } from '../redux/slices/mapSlice'
import RenderMap from './helpers/RenderMap'



function Map() {
  const level = useSelector((state: any) => state.level.level)
  const dispatch = useDispatch()


  useEffect(() => {
    handleCurrentPosition()
  }, [level])


  const handleCurrentPosition = () => {
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLElement>
    if (generatedNodes.length === 0) return
      generatedNodes.forEach((node) => {
        // console.log(Number(node.dataset.position?.split("-")[1]), level - 1)
        if (Number(node.dataset.position?.split("-")[1]) === level - 1) {
          // console.log("trigg",Number(node.dataset.position?.split("-")[1]), level)
          node.classList.remove("bg-opacity-50")
        } else {
          node.classList.add("bg-opacity-50")
        }
      })
  }
  const handleRegen = () => {
    // setPath(generateNodes())
    dispatch(resetMap())
  }
  const handlePositionChange = () => {
    // dispatch(increment())
  }
  const handleLvlReset = () => {
    dispatch(reset())
  }

  return (
    <div className='mx-auto w-fit pb-5'>
      <button onClick={handleRegen}>Regen Map</button>
      <button className='mx-5' onClick={handlePositionChange}>Increment Level</button>
      <button onClick={handleLvlReset}>Reset Level</button>
      <RenderMap/>
    </div>
  )
}

export default Map
