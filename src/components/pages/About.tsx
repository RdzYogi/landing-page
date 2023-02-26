import anime from 'animejs'
import React, { useEffect } from 'react'

function About() {
  // const about = document.getElementById("about-page")
  // const wipeData = {
  //   pozX: 0
  // }
  // useEffect(() => {
  //   if (about === null) return
  //   console.log("UseEffect triggered",props.position)
  //   anime({
  //     targets: wipeData,
  //     pozX: 100,
  //     duration: 1000,
  //     easing: "linear",
  //     round: 1,
  //     update: function() {
  //       about.style.clipPath = "polygon(0% 0%,0% 100%," + wipeData.pozX + "% 100%," + wipeData.pozX + "% 0%)"
  //     },
  //     complete: function() {
  //       about.style.clipPath = ""
  //     }

  //   })
  // },[props.position])
  return (
    <div id='about-page' className='text-white z-20 w-3/4 m-auto relative h-fit'>
      <div className=''>We are in About</div>
    </div>
  )
}

export default About
