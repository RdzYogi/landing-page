import React from 'react'
type Props ={
  handleNavigation:(event : React.MouseEvent<HTMLButtonElement>)=>void
}

function Navbar(props:Props) {
  return (
    <div className='h-20 flex flex-col items-center md:w-3/4 m-auto pb-2 w-full'>
      <div className='flex justify-between items-end md:w-3/4 w-full mx-8 md:mx-0 text-lg font-bold z-20'>
        <button id="about" onClick={props.handleNavigation} className='  text-white h-12 transition transition-duration-300 ease-in-out hover:text-gray-400'>About</button>
        <button id="projects" onClick={props.handleNavigation} className=' text-white h-12 transition transition-duration-300 ease-in-out hover:text-gray-400'>Projects</button>
        <button id="third" onClick={props.handleNavigation} className=' text-white h-12 transition transition-duration-300 ease-in-out hover:text-gray-400'>third</button>
      </div>
      <div className='h-1 bg-white w-32 z-20'></div>
    </div>
  )
}

export default Navbar
