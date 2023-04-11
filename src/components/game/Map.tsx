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
    setMap(generateMap(path))
  }, [path])
  useEffect(() => {
    if (map === undefined) return
    // console.log("triggered")
    drawPaths(path)
  }, [map,path])
  return (
    <div className='mx-auto w-fit pb-5'>
      {map}
    </div>
  )
}

export default Map
