import React, { useEffect, useState } from 'react'
import generateMap from './helpers/generateMap'

function Map({level, setLevel} : {level: number, setLevel: Function}) {
  const [map, setMap] = useState<React.ReactElement>()
  useEffect(() => {
    console.log("triggered")
    setMap(generateMap())
  }, [])
  return (
    <div className='mx-auto w-fit pb-5'>
      {map}
    </div>
  )
}

export default Map
