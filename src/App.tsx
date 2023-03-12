import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';
import About from './components/pages/About';
import Projects from './components/pages/Projects';
import anime from 'animejs/lib/anime.es.js';
import { Circle } from './components/helpers/CircleClass';
import Contact from './components/pages/Contact';
import Game from './components/pages/Game';



// Variables for the canvas fade effect
const timeOutForRender = 30
let render = true
const RefreshIntervalInitial = 20;
let RefreshInterval = RefreshIntervalInitial;
const FadeAmount = 0.1;
const animationDuration = 300
let componentToRender: React.ReactNode = null;
const pageWipeDuration = 300




function App() {
  const animations:any =[]
  function removeAnimation(animation:any) {
    const index = animations.indexOf(animation);
    animations.splice(index, 1);
  }

  useEffect(()=>{
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("click", handleMouseClick)
    document.addEventListener("touchstart", handleMouseClick)
    window.addEventListener("resize", handleCanvasSize)
    document.addEventListener("scroll", handleScroll)
    window.screen.orientation.addEventListener("change", handleOrientationChange)

    const buffer1 = document.getElementById("buffer-1") as HTMLDivElement
    const buffer2 = document.getElementById("buffer-2") as HTMLDivElement


    var viewport = document.querySelector("meta[name=viewport]")
    if (viewport) {
      var content = viewport.getAttribute("content");
      viewport.setAttribute("content", content + ", maximum-scale=1.0")
    }

    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    if (canvas === null) return
    if (window.visualViewport){
      // console.log("based on visual viewport", window.visualViewport.height, window.visualViewport.width)
      canvas.height = Math.max(buffer1.offsetHeight + buffer1.offsetTop, buffer2.offsetHeight + buffer2.offsetTop, window.visualViewport.height)
      canvas.width = window.visualViewport.width
    } else{
      console.log("based on window", window.innerHeight, window.innerWidth)
      canvas.height = Math.max(buffer1.offsetHeight + buffer1.offsetTop, buffer2.offsetHeight + buffer2.offsetTop, window.innerHeight)
      canvas.width = window.innerWidth
    }
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (ctx === null) return
    anime({
      duration: Infinity,
      update: function() {
        if (RefreshInterval < 0) {
          // console.log("triggered", RefreshInterval)
          ctx.save()
          ctx.globalAlpha = FadeAmount;
          ctx.fillStyle = "rgba(0,0,0)";
          ctx.globalCompositeOperation = "darken"
          ctx.fillRect(0, 0, canvas.width,canvas.height);
          ctx.globalCompositeOperation = "source-over"
          ctx.globalAlpha = 1;
          ctx.restore();
          RefreshInterval = RefreshIntervalInitial
        }
        RefreshInterval -= 1

        animations.forEach(function(anim: any) {
          anim.animatables.forEach(function(animatable: any) {
            if (anim.completed !== true) {
                animatable.target.draw();
            }
          });
        });
      }
    })


    // Explosions
    return ()=>{
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("click", handleMouseClick)
      document.removeEventListener("touchstart", handleMouseClick)
      window.removeEventListener("resize", handleCanvasSize)
      document.removeEventListener("scroll", handleScroll)
      window.screen.orientation.removeEventListener("change", handleOrientationChange)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

const handleScroll = (event: Event)=>{
  // console.log("scrolling")
  // const canvas = document.getElementById("canvas") as HTMLCanvasElement
  // const buffer1 = document.getElementById("buffer-1") as HTMLDivElement
  // const buffer2 = document.getElementById("buffer-2") as HTMLDivElement
  // if (canvas === null ) return
  // canvas.height = Math.max(buffer1.offsetHeight + buffer1.offsetTop, buffer2.offsetHeight + buffer2.offsetTop)
  // console.log(buffer1.offsetHeight, buffer2.offsetHeight)
}

const handleMouseClick = (event: MouseEvent | TouchEvent )=>{
  // event.preventDefault()
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  let x = 0
  let y = 0
  if (event instanceof TouchEvent) {
    x = event.touches[0].pageX
    y = event.touches[0].pageY
  } else {
    x = event.pageX
    y = event.pageY
  }

  if (canvas === null) return

  const numberOfSparks = Math.floor(Math.random() * 4) + 5
  for (let index = 0; index < numberOfSparks; index++) {
    const colorPalette = ["rgba(50,50,50,0.1)", "rgba(60,60,60,0.1)", "rgba(40,40,40,0.1)", "rgba(30,30,30,0.1)"]
    const currentColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    const getNewDestination = ()=>{
      let newDestinationX = 1
      let newDestinationY = 1
      while (Math.sqrt(newDestinationX * newDestinationX + newDestinationY * newDestinationY) > 100 || Math.sqrt(newDestinationX * newDestinationX + newDestinationY * newDestinationY) < 20 ) {
        // console.log("in while")
        newDestinationX = (Math.random() * 100) * (Math.random() >= 0.5 ? 1 : -1)
        newDestinationY = (Math.random() * 100) * (Math.random() >= 0.5 ? 1 : -1)
      }
      return {destinationX: newDestinationX, destinationY: newDestinationY}
      }

    const {destinationX, destinationY} = getNewDestination()

    const ctx = canvas.getContext("2d")
    if (ctx === null) return
    const ripple = new Circle({
      ctx: ctx,
      x: x,
      y: y,
      dx: 0,
      dy: 0,
      fill: currentColor,
      stroke: {
        width: 1,
        color: currentColor
      },
      opacity: 1
    });

    const rippleAnimation = anime({
      targets: ripple ,
      dx: destinationX,
      dy: destinationY,
      opacity: 0,
      // easing: "easeOutExpo",
      easing: "easeOutCirc",
      duration: animationDuration,
      complete: removeAnimation
    });
    // console.log(rippleAnimation)
    animations.push(rippleAnimation);

  }

}

  const handleOrientationChange = (e:Event)=>{
    e.preventDefault()
    window.removeEventListener("resize", handleCanvasSize)
    // console.log("orientation change")
    const buffer1 = document.getElementById("buffer-1") as HTMLDivElement
    const buffer2 = document.getElementById("buffer-2") as HTMLDivElement

    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    if (canvas === null) return
    // eslint-disable-next-line no-restricted-globals
    canvas.height = canvas.height = Math.max(buffer1.offsetHeight + buffer1.offsetTop, buffer2.offsetHeight + buffer2.offsetTop, screen.height)
    // eslint-disable-next-line no-restricted-globals
    canvas.width = screen.width
    // console.log("canvas size", canvas.height, canvas.width)
    window.addEventListener("resize", handleCanvasSize)
  }
  const handleCanvasSize = ()=>{
    // console.log("resize")
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const buffer1 = document.getElementById("buffer-1") as HTMLDivElement
    const buffer2 = document.getElementById("buffer-2") as HTMLDivElement
    if (canvas === null) return
    // if (window && window.visualViewport){
    //   // console.log(window.visualViewport.height, window.visualViewport.width)
    //   canvas.height = window.visualViewport.height
    //   canvas.width = window.visualViewport.width
    // } else{
      canvas.height = Math.max(buffer1.offsetHeight + buffer1.offsetTop, buffer2.offsetHeight + buffer2.offsetTop, window.innerHeight)
      canvas.width = window.innerWidth
    // }
  }

  const handleMouseMove = (event: MouseEvent )=>{
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const x = event.pageX
    const y = event.pageY
    if (canvas === null) return
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (ctx === null) return


    if (render) {
      // console.log("draw state:", render)
      var grd = ctx.createRadialGradient(150, 150, 10, 150, 150, 150);
      grd.addColorStop(0, "#333");
      grd.addColorStop(0.4, "rgba(10,10,10,0)");
      ctx.save()
      ctx.translate(x-150,y-150);
      ctx.fillStyle = grd;
      ctx.fillRect(0,0,300,300);
      ctx.restore();
      render = false
      setTimeout(()=>{
        render = true
      }, timeOutForRender)
    }

  }

  const [position, setPosition] = useState<number>(0)
  const [heroBuffer, setHeroBuffer] = useState<number>(1)
  const [buffer1, setBuffer1] = useState<React.ReactNode>(<About firstLoad={true} />)
  const [buffer2, setBuffer2] = useState<React.ReactNode>(null)
  let localPosition = 0

  const handleNavigation = (event : React.MouseEvent<HTMLButtonElement>) =>{
    const localPrevPosition = position

    event.preventDefault()

  switch (event.currentTarget.id) {
    case "":
    case "about":
      componentToRender = <About firstLoad={false}/>;
      setPosition(0)
      localPosition = 0
      break;
    case "projects":
      componentToRender = <Projects />;
      setPosition(1)
      localPosition = 1
      break;
    case "contact":
      componentToRender = <Contact />;
      setPosition(2)
      localPosition = 2
      break;
    case "game":
      componentToRender = <Game />;
      setPosition(3)
      localPosition = 3
      break;
    default:
      componentToRender = <About firstLoad={false}/>;
      setPosition(0)
  }
    // After switch we get the positions and the hero component to render

    // Set current page and previous page to corresponding buffers
    const bufferElement1 = document.getElementById("buffer-1")
    const bufferElement2 = document.getElementById("buffer-2")
    if (bufferElement1 === null || bufferElement2 === null) return
    let currentPage:HTMLElement
    let prevPage:HTMLElement
    if (heroBuffer === 1){
      currentPage = bufferElement2
      prevPage = bufferElement1
      setHeroBuffer(2)
      setBuffer1(buffer1)
      setBuffer2(componentToRender)
    } else {
      currentPage = bufferElement1
      prevPage = bufferElement2
      setHeroBuffer(1)
      setBuffer2(buffer2)
      setBuffer1(componentToRender)
    }
    const wipeData = {
      fromLeft: 0,
      fromRight: 100,
    }

    if (localPrevPosition < localPosition){
      currentPage.style.clipPath = "polygon(0% 0%,0% 100%,0% 100%,0% 0%)"
      prevPage.style.clipPath = "polygon(0% 0%,0% 100%,100% 100%,100% 0%)"
      anime({
        targets: wipeData,
        fromLeft: 100,
        duration: pageWipeDuration,
        easing: "linear",
        round: 1,
        update: function() {
          // console.log("update", wipeData.fromLeft)
          currentPage.style.clipPath = "polygon(0% 0%,0% 100%," + wipeData.fromLeft + "% 100%," + wipeData.fromLeft + "% 0%)"
          prevPage.style.clipPath = "polygon("+ wipeData.fromLeft +"% 0%,"+ wipeData.fromLeft +"% 100%,100% 100%,100% 0%)"
        },
        complete: function() {
        }
      })

    } else if(localPrevPosition > localPosition){
      anime({
        targets: wipeData,
        fromRight: 0,
        duration: pageWipeDuration,
        easing: "linear",
        round: 1,
        update: function() {
          currentPage.style.clipPath = "polygon(" + wipeData.fromRight + "% 0%," + wipeData.fromRight + "% 100%,100% 100%,100% 0%)"
          prevPage.style.clipPath = "polygon(0% 0%,0% 100%," + wipeData.fromRight + "% 100%," + wipeData.fromRight + "% 0%)"
        },
        complete: function() {
        }
      })
    }

  }

  return (
    <div className='relative'>
      <Navbar handleNavigation={handleNavigation} position={position}/>
      <div id="buffer-1" className='absolute w-full z-20'>
        {buffer1}
      </div>
      <div id="buffer-2" className='absolute w-full z-20'>
        {buffer2}
      </div>
      <canvas id="canvas" className='absolute top-0 z-1'></canvas>
    </div>
  );
}

export default App;
