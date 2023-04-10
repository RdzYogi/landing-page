import React from 'react'


function generateMap(path: string[]) {
  const nodes = []
  // console.log(path)
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 12; j++) {
      // console.log(path.includes([i, j]), [i, j])
      nodes.push(<div key={i+"-"+j} data-row={i+1} data-column={j+1} className='w-16 h-16 relative'>
        {path.includes(`${i}-${j}`) ?
        <>
          <svg className='absolute -top-[50vh] w-fit h-[100vh] z-30 '>
            {/* <line x1="1" y1="1" x2="210" y2="20" stroke='white' /> */}
          </svg>
          <div data-position={i+"-"+j}
            className={'node absolute w-[45%] h-[45%] bg-black bg-opacity-50 cursor-pointer rounded-full'
            }></div>
        </>: null}
      </div>)
    }
  }

  return (
    <div className='flex overflow-hidden'>
      <div className='grid grid-cols-12 gap-4 place-items-center mt-6'>
        {nodes}
      </div>
      <div className='flex items-center ml-4'>
        <div className='w-16 h-16 bg-white border-2 border-white'></div>
      </div>
    </div>
  )
}

export default generateMap
