import React, { useEffect } from 'react'
type Props ={
  handleNavigation:(event : React.MouseEvent<HTMLButtonElement>)=>void,
  position:number
}

const shadow = "0px 2px 10px rgba(255, 255, 255, 0.6)"

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
        // add to the style of the button a glow from bottom to top
        resetShadows()
        about.style.textShadow = shadow
        break;

      case 1:
        indicator.style.left = projects.getBoundingClientRect().left +'px'
        indicator.style.width = projects.offsetWidth + "px"
        resetShadows()
        projects.style.textShadow = shadow
        break;

      case 2:
        indicator.style.left = contact.getBoundingClientRect().left +'px'
        indicator.style.width = contact.offsetWidth + "px"
        resetShadows()
        contact.style.textShadow = shadow
        break;

      case 3:
        indicator.style.left = game.getBoundingClientRect().left +'px'
        indicator.style.width = game.offsetWidth + "px"
        resetShadows()
        game.style.textShadow = shadow
        break;

      default:
        break;
    }
  }
  const resetShadows = () => {
    const about = document.getElementById("about")
    const projects = document.getElementById("projects")
    const contact = document.getElementById("contact")
    const game = document.getElementById("game")
    if (about === null || projects === null || contact === null || game === null) return
    about.style.textShadow = "none"
    projects.style.textShadow = "none"
    contact.style.textShadow = "none"
    game.style.textShadow = "none"
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
      <div className='flex justify-between mx-auto h-12 w-80 md:w-96 text-gray-200 text-lg font-bold z-20 border'>
        <button id="about" onClick={props.handleNavigation} className='h-12 text-xl transition transition-duration-300 ease-in-out hover:text-gray-400 z-20'>About</button>
        <button id="projects" onClick={props.handleNavigation} className='h-12 text-xl transition transition-duration-300 ease-in-out hover:text-gray-400 z-20'>Projects</button>
        <button id="contact" onClick={props.handleNavigation} className='h-12 text-xl transition transition-duration-300 ease-in-out hover:text-gray-400 z-20'>Contact</button>
        <button id="game" onClick={props.handleNavigation} className=' h-12 text-xl min-w-fit transition transition-duration-300 ease-in-out hover:text-gray-400 z-20'>Game</button>
      </div>
      <div className='w-80 md:w-96 mx-0 relative h-px'>
        <div id="indicator" className='absolute transition-all duration-300 ease-in-out -top-3 z-20'>
          <div className='h-3 z-[21]'
          style={{background: "linear-gradient(rgba(255,255,255,0),50%,#333,#666,#eee)", clipPath: "polygon(0 0, 100% 0, 70% 100%, 30% 100%)"}}
          >
          </div>
          <div className='h-[2px] z-[20]'
          // linear-gradient(#fff, 30%, #666, #333, 70%, rgba(0,0,0,0),80%,rgba(0,0,0,0))
          style={{background: "linear-gradient(90deg,rgba(0,0,0,0), #eee,80%, rgba(0,0,0,0)"}}
          >
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
