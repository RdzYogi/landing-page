import React from 'react'

const deviationForMapNodes = 30
async function generateMap(path: string[]) {
  const nodes = []
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 12; j++) {
      nodes.push(<div key={i+"-"+j} data-row={i+1} data-column={j+1} className='w-16 h-16 relative'>
        {path.includes(`${i}-${j}`) ?
        <>
          <svg className='absolute -top-[50vh] w-fit h-[100vh] z-20 '>
            {/* <filter id="squiggly">
              <feTurbulence baseFrequency="0.022" numOctaves="3" type="turbulence" seed="10" result="turbulence"></feTurbulence>
              <feDisplacementMap scale="10" in="SourceGraphic" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
            </filter>
            <filter id="pattern-filter">
            <feTurbulence type="turbulence" baseFrequency=".01"
                numOctaves="2" result="turbulence"/>
            <feDisplacementMap in2="turbulence" in="SourceGraphic"
                scale="10" xChannelSelector="R" yChannelSelector="G"/>
            </filter> */}
          </svg>
          <div data-position={i+"-"+j}
            className={'node absolute w-[45%] h-[45%] z-30 bg-opacity-50 bg-black cursor-pointer rounded-full '
            } style={{top: `${Math.round(Math.random()*deviationForMapNodes)}%`, left: `${Math.round(Math.random()*deviationForMapNodes)}%`}}
            ></div>
        </>: null}
      </div>)
    }
  }

  return (
    <div className='flex overflow-hidden'>
      <div className='grid grid-cols-12 gap-x-6 place-items-center mt-6'>
        {nodes}
      </div>
      <div className='flex items-center ml-4'>
        <div className='boss w-16 h-16 bg-white border-2 border-white'></div>
      </div>
    </div>
  )
}

export default generateMap
