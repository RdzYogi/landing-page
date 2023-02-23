import React, { useEffect } from 'react'
type Props ={
  handleNavigation:(event : React.MouseEvent<HTMLButtonElement>)=>void,
  position:number
}

function Navbar(props:Props) {
  useEffect(() => {
    const indicator = document.getElementById("indicator")
    const about = document.getElementById("about")
    const projects = document.getElementById("projects")
    const contact = document.getElementById("contact")
    const game = document.getElementById("game")
    if (indicator === null || about === null || projects === null || contact === null || game === null) return
    switch (props.position) {
      case 0:
        indicator.classList.remove("left-1/2")
        indicator.classList.remove("left-3/4")
        indicator.classList.remove("left-full")
        indicator.classList.add("left-1/4")
        indicator.style.width = about.offsetWidth + "px"
        break;

      case 1:
        indicator.classList.remove("left-1/4")
        indicator.classList.remove("left-3/4")
        indicator.classList.remove("left-full")
        indicator.classList.add("left-1/2")
        indicator.style.width = projects.offsetWidth + "px"
        break;

      case 2:
        indicator.classList.remove("left-1/4")
        indicator.classList.remove("left-1/2")
        indicator.classList.remove("left-full")
        indicator.classList.add("left-3/4")
        indicator.style.width = contact.offsetWidth + "px"
        break;

      case 3:
        indicator.classList.remove("left-1/4")
        indicator.classList.remove("left-1/2")
        indicator.classList.remove("left-3/4")
        indicator.classList.add("left-full")
        indicator.style.width = game.offsetWidth + "px"
        break;

      default:
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.position])

  return (
    <div className='h-20 items-center md:w-7xl pb-2 w-full'>
      <div className='relative h-12 w-3/4 text-lg font-bold z-20'>
        <button id="about" onClick={props.handleNavigation} className='absolute left-1/4 text-white h-12 transition transition-duration-300 ease-in-out hover:text-gray-400'>About</button>
        <button id="projects" onClick={props.handleNavigation} className='absolute left-1/2 text-white h-12 transition transition-duration-300 ease-in-out hover:text-gray-400'>Projects</button>
        <button id="contact" onClick={props.handleNavigation} className='absolute left-3/4 text-white h-12 transition transition-duration-300 ease-in-out hover:text-gray-400'>Contact</button>
        <button id="game" onClick={props.handleNavigation} className='absolute left-full text-white h-12 min-w-fit transition transition-duration-300 ease-in-out hover:text-gray-400'>Game</button>
      </div>
      <div className='w-3/4 mx-0 relative h-px'>
        <div id="indicator" className='h-1 absolute left-1/4 transition-all duration-300 ease-in-out bg-white z-20'></div>
      </div>
    </div>
  )
}

export default Navbar
