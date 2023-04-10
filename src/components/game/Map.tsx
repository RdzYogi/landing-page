import React, { useEffect, useState } from 'react'
import generateMap from './helpers/generateMap'

function Map({level, setLevel} : {level: number, setLevel: Function}) {
  const [map, setMap] = useState<React.ReactElement>()
  useEffect(() => {
    console.log("triggered")
    setMap(generateMap())
  }, [])
  return (
    <div>
      {map}
    </div>
  )
}

export default Map
