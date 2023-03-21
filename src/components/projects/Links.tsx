import React from 'react'

function Links({live, github}: {live: string, github: string}) {
  return (
    <div className='flex justify-center gap-4 px-5 mt-3'>
      <button className="py-2 px-2 text-sm font-medium border border-gray-500 hover:border-gray-300 hover:text-gray-200 text-center text-white rounded-lg transition duration-300 ease-in-out sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-800">GitHub</button>
      <button className="py-2 px-2 text-sm font-medium border border-gray-500 hover:border-gray-300 hover:text-gray-200 text-center text-white rounded-lg transition duration-300 ease-in-out sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-800">Live</button>
    </div>
  )
}

export default Links
