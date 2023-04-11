import React, { useEffect, useState } from 'react'
import generateMap from './helpers/generateMap'
import drawPaths from './helpers/drawPaths'
import generatePath from './helpers/generatePath'


function Map({level, setLevel} : {level: number, setLevel: Function}) {
  const [map, setMap] = useState<React.ReactElement>()
  const [path, setPath] = useState<string[]>([])
  useEffect(() => {
    window.addEventListener("resize", handleMapResize)
    if (path.length > 0) return
    setPath(generatePath())
  // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      window.removeEventListener("resize", handleMapResize)
    }
  }, [])

  const handleMapResize = () => {
    // console.log("triggered", path)
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
    // console.log("triggered before check")
    if (map === undefined) return
    // console.log("triggered")
    setTimeout(() => {
      drawPaths(path)
      handleCurrentLevel()
    }, 50);
  }, [map,path])


  const handleCurrentLevel = () => {
    const generatedNodes = document.querySelectorAll('.node') as NodeListOf<HTMLElement>
    if (generatedNodes.length === 0) return
    // setTimeout(() => {
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
    setPath(generatePath())
  }
  return (
    <div className='mx-auto w-fit pb-5'>
      <button onClick={handleRegen}>Regen Map</button>
      {map}
    </div>
  )
}

export default Map
