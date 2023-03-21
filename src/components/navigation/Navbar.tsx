import React, { useEffect } from 'react'
type Props ={
  handleNavigation:(event : React.MouseEvent<HTMLButtonElement>)=>void,
  position:number
}

function Navbar(props:Props) {
  const positionIndicator = () => {
    const indicator = document.getElementById("indicator")
    const about = document.getElementById("about")
    const projects = document.getElementById("projects")
    const contact = document.getElementById("contact")
    const game = document.getElementById("game")
    if (indicator === null || about === null || projects === null || contact === null || game === null) return
    switch (props.position) {
      case 0:
        indicator.style.left = about.getBoundingClientRect().left +'px'
        indicator.style.width = about.offsetWidth + "px"
        break;

      case 1:
        indicator.style.left = projects.getBoundingClientRect().left +'px'
        indicator.style.width = projects.offsetWidth + "px"
        break;

      case 2:
        indicator.style.left = contact.getBoundingClientRect().left +'px'
        indicator.style.width = contact.offsetWidth + "px"
        break;

      case 3:
        indicator.style.left = game.getBoundingClientRect().left +'px'
        indicator.style.width = game.offsetWidth + "px"
        break;

      default:
        break;
    }
  }
  useEffect(() => {
    window.addEventListener('resize', positionIndicator)
    positionIndicator()
    return () => {
      window.removeEventListener('resize', positionIndicator)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.position])

  return (
    <div className='h-20 items-center md:w-7xl pb-2 w-full'>
      <div className='flex justify-between mx-auto h-12 w-80 md:w-96 text-gray-200 text-lg font-bold z-20'>
        <button id="about" onClick={props.handleNavigation} className='h-12 transition transition-duration-300 ease-in-out hover:text-gray-400 z-20'>About</button>
        <button id="projects" onClick={props.handleNavigation} className=' h-12 transition transition-duration-300 ease-in-out hover:text-gray-400 z-20'>Projects</button>
        <button id="contact" onClick={props.handleNavigation} className=' h-12 transition transition-duration-300 ease-in-out hover:text-gray-400 z-20'>Contact</button>
        <button id="game" onClick={props.handleNavigation} className=' h-12 min-w-fit transition transition-duration-300 ease-in-out hover:text-gray-400 z-20'>Game</button>
      </div>
      <div className='w-80 md:w-96 mx-0 relative h-px'>
        <div id="indicator"
        className='h-1 absolute transition-all duration-300 ease-in-out  z-20'
        style={{background: "radial-gradient(#fff, 30%, #666, #333, 70%, rgba(0,0,0,0),80%,rgba(0,0,0,0)) "}}
        >
        </div>
      </div>
    </div>
  )
}

export default Navbar
