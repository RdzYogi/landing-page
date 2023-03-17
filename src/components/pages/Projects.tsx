import anime from 'animejs'
import React, { useEffect } from 'react'
import Filmoteca from '../projects/headers/Filmoteca'
import Pimp from '../projects/headers/Pimp'
import TvTalk from '../projects/headers/TvTalk'

const detailsHeight = "60vh"

function Projects() {

  useEffect(() => {
    const projectDetails = document.getElementById('project-details')
    if (projectDetails === null) return
    projectDetails.classList.add('filmoteca')
    setTimeout(() => {
      anime({
        targets: projectDetails,
        height: detailsHeight,
        duration: 500,
        easing: 'easeInOutQuad',
        complete: () => {}
      })
    }, 600);
  }, [])

  const handleMouseEnter = (event:any) => {
    // zoom in on the card
    event.preventDefault()
    event.persist();
    event.nativeEvent.stopImmediatePropagation();
    event.stopPropagation()

    setTimeout(() => {
      event.target.style.transition = "ease-in-out"
    }, 200)
  }

  const handleMouseLeave = (event:any) => {
    // zoom out on the card
    event.preventDefault()
    event.persist();
    event.nativeEvent.stopImmediatePropagation();
    event.stopPropagation()
    event.target.style.transform = "scale(1)"
    event.target.style.transition = "transform 0.2s ease-out"
  }

  const handleMouseMove = (event:any) => {
    const x = event.clientX - event.target.offsetLeft - event.target.parentElement.offsetLeft - event.target.parentElement.parentElement.offsetLeft - event.target.offsetWidth / 2
    const y = -(event.clientY - event.target.offsetTop - event.target.parentElement.offsetTop - event.target.parentElement.parentElement.offsetTop - event.target.parentElement.parentElement.parentElement.offsetTop  - event.target.offsetHeight / 2)
    event.target.style.transform = "perspective(75em) scale(1.1) rotateY(" + x / 10 + "deg) rotateX(" + y / 10 + "deg)"
  }

  const handleClick = (e:any) => {

    const projectDetails = document.getElementById('project-details')
    if (projectDetails === null) return
    projectDetails.scrollIntoView({behavior: 'smooth', block: 'start'});
    switch (e.target.id) {
      case "filmoteca":
        if (projectDetails.classList.contains('filmoteca')) return
        resetClass()
        projectDetails.classList.add('filmoteca')


        anime({
          targets: projectDetails,
          height: '0',
          duration: 250,
          easing: 'easeInOutQuad',
          complete: () => {
            colorReset()
            projectDetails.classList.add('bg-fuchsia-500')
            anime({
              targets: projectDetails,
              height: detailsHeight,
              duration: 250,
              easing: 'easeInOutQuad',
              complete: () => {}
            })
          }
        })
        break;
      case "tv-talk":
        if (projectDetails.classList.contains('tv-talk')) return
        resetClass()
        projectDetails.classList.add('tv-talk')

        anime({
          targets: projectDetails,
          height: '0',
          duration: 250,
          easing: 'easeInOutQuad',
          complete: () => {
            colorReset()
            projectDetails.classList.add('bg-blue-500')
            anime({
              targets: projectDetails,
              height: detailsHeight,
              duration: 250,
              easing: 'easeInOutQuad',
              complete: () => {}
            })
          }
        })
        break;
      case "pimp":
        if (projectDetails.classList.contains('pimp')) return
        resetClass()
        projectDetails.classList.add('pimp')

        anime({
          targets: projectDetails,
          height: '0',
          duration: 250,
          easing: 'easeInOutQuad',
          complete: () => {
            colorReset()
            projectDetails.classList.add('bg-red-500')
            anime({
              targets: projectDetails,
              height: detailsHeight,
              duration: 250,
              easing: 'easeInOutQuad',
              complete: () => {}
            })
          }
        })
        break;
      default:
        break;
    }
  }
  const resetClass = () => {
    const projectDetails = document.getElementById('project-details')
    if (projectDetails === null) return
    projectDetails.classList.remove('filmoteca')
    projectDetails.classList.remove('tv-talk')
    projectDetails.classList.remove('pimp')
  }

  const colorReset = () => {
    const projectDetails = document.getElementById('project-details')
    if (projectDetails === null) return
    projectDetails.classList.remove('bg-fuchsia-500')
    projectDetails.classList.remove('bg-blue-500')
    projectDetails.classList.remove('bg-red-500')
  }

  return (
    <div id='projects-page' className='text-white z-20 w-full lg:w-11/12 m-auto relative min-h-[25vh]'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 justify-between'>
        <div id="filmoteca" onClickCapture={handleClick} onMouseMoveCapture={handleMouseMove} onMouseOutCapture={handleMouseLeave} onMouseOverCapture={handleMouseEnter} className='aspect-video flex cursor-pointer'>
          <Filmoteca/>
        </div>
        <div id="tv-talk" onClick={handleClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className='aspect-video flex cursor-pointer'>
          <TvTalk/>
        </div>
        <div id="pimp" onClick={handleClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className='aspect-video flex cursor-pointer'>
          <Pimp/>
        </div>
      </div>
      <div id="project-details" className='w-11/12 mx-auto mt-10 bg-fuchsia-500 mb-5'>

      </div>
    </div>
  )
}

export default Projects
