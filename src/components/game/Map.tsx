import React, { useEffect, useState } from 'react'
import generateMap from './helpers/generateMap'
import drawPaths from './helpers/drawPaths'
import generateNodes from './helpers/generateNodes'
import { useDispatch, useSelector } from 'react-redux'
import { increment, reset } from '../redux/slices/levelSlice'
import { resetMap } from '../redux/slices/mapSlice'



function Map() {
  const [map, setMap] = useState<React.ReactElement>()
  // const [path, setPath] = useState<string[]>([])
  const level = useSelector((state: any) => state.level.level)
  const dispatch = useDispatch()
  const path= useSelector((state: any) => state.map.nodes)
  // console.log(pathTest)
  useEffect(() => {
    window.addEventListener("resize", handleMapResize)
    // if (path.length > 0) return
    // setPath(generateNodes())
  // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      window.removeEventListener("resize", handleMapResize)
    }
  }, [])

  const handleMapResize = () => {
    drawPaths(path)
  }
  useEffect(() => {
    // console.log(path)
    if (path.length === 0) return
    generateMap(path).then((map) => {
      setMap(map)
    })
  }, [path])
  useEffect(() => {
    if (map === undefined) return
    // console.log("triggered")
    setTimeout(() => {
      drawPaths(path)
      handleCurrentLevel()
    }, 50);
  }, [map,path])

  useEffect(() => {
    handleCurrentLevel()
  }, [level])


  const handleCurrentLevel = () => {
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
  const handleLvlChange = () => {
    dispatch(increment())
  }
  const handleLvlReset = () => {
    dispatch(reset())
  }

  return (
    <div className='mx-auto w-fit pb-5'>
      <button onClick={handleRegen}>Regen Map</button>
      <button className='mx-5' onClick={handleLvlChange}>Increment Level</button>
      <button onClick={handleLvlReset}>Reset Level</button>
      {map}
    </div>
  )
}

export default Map
