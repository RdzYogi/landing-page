import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetMap, updateMap, resetPosition } from '../redux/slices/mapSlice'
import RenderMap from './helpers/RenderMap'

const classForTraveledPaths = "bg-opacity-25"
const classForCurrentPosition = "bg-yellow-400"

function Map() {

  const dispatch = useDispatch()


  const handleNewMap = () => {
    dispatch(resetMap())
    // handleCurrentPosition()
  }

  const handleLvlReset = () => {
    dispatch(resetPosition())
    // handleCurrentPosition()
  }


  return (
    <div className='mx-auto w-fit pb-5'>
      <button className='mr-5' onClick={handleNewMap}>New Map</button>
      <button onClick={handleLvlReset}>Reset Level</button>
      <RenderMap/>
    </div>
  )
}

export default Map
