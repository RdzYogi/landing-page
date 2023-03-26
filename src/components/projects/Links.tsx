import React from 'react'

function Links({live, github}: {live: string, github: string}) {
  return (
    <div className='flex justify-center gap-4 px-5 mt-3'>
      <a href={github} target='blank' className="py-2 px-2 text-sm font-medium border border-gray-500 hover:border-gray-300 hover:text-gray-200 text-center text-white rounded-lg transition duration-300 ease-in-out sm:w-fit ">
        Source
      </a>
      { live &&
        <a href={live} target='blank' className="py-2 px-2 text-sm font-medium border border-gray-500 hover:border-gray-300 hover:text-gray-200 text-center text-white rounded-lg transition duration-300 ease-in-out sm:w-fit ">
          Live
        </a>
      }
    </div>
  )
}

export default Links
