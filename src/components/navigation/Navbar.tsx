import React from 'react'
type Props ={
  handleNavigation:(event : React.MouseEvent<HTMLButtonElement>)=>void
}

function Navbar(props:Props) {
  return (
    <div className='bg-gray-500 h-20 flex justify-center'>
      <div className='flex justify-between w-1/2 text-lg'>
        <button id="about" onClick={props.handleNavigation} className='border border-black h-12 '>About</button>
        <button id="projects" onClick={props.handleNavigation} className='border border-black h-12'>Projects</button>
        <button id="third" onClick={props.handleNavigation} className='border border-black h-12'>third</button>
      </div>
    </div>
  )
}

export default Navbar
