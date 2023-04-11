import React, { useEffect, useState } from 'react'
import generateMap from './helpers/generateMap'
import drawPaths from './helpers/drawPaths'
import generatePath from './helpers/generatePath'

function Map({level, setLevel} : {level: number, setLevel: Function}) {
  const [map, setMap] = useState<React.ReactElement>()
  const [path, setPath] = useState<string[]>([])
  useEffect(() => {
    if (path.length > 0) return
    setPath(generatePath())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
    }, 50);
  }, [map,path])
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
