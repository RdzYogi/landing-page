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
const RefreshInterval = 15;
const FadeAmount = 0.005;
const animationDuration = 600



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
    // window.addEventListener("orientationchange", handleCanvasSize)
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    if (canvas === null) return
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (ctx === null) return
    anime({
      duration: Infinity,
      update: function() {
        animations.forEach(function(anim: any) {
          anim.animatables.forEach(function(animatable: any) {
            if (anim.completed !== true) {
              // console.log("draw trigger", anim.progress)
                animatable.target.draw();
            }
          });
        });
      }
    })

    const interval = setInterval(()=>{
      ctx.save()
      ctx.globalAlpha = FadeAmount;
      ctx.fillStyle = "rgba(0,0,0)";
      ctx.globalCompositeOperation = "darken"
      ctx.fillRect(0, 0, canvas.width,canvas.height);
      ctx.globalCompositeOperation = "source-over"
      ctx.globalAlpha = 1;
      ctx.restore();
    }, RefreshInterval)

    // Explosions
    return ()=>{
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("click", handleMouseClick)
      document.removeEventListener("touchstart", handleMouseClick)
      window.removeEventListener("resize", handleCanvasSize)
      // window.removeEventListener("orientationchange", handleCanvasSize)
      clearInterval(interval)

    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleCanvasSize = ()=>{
    console.log("trigger resize")
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    if (canvas === null) return
    // canvas.height = window.innerHeight
    // canvas.width = window.innerWidth
    if (window.visualViewport){
      canvas.height = window.visualViewport.height
      canvas.width = window.visualViewport.width
    } else{
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth
    }
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
      grd.addColorStop(0.8, "rgba(10,10,10,0)");
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

  const [navigation, setNavigation] = useState<React.ReactNode>(<About/>)
  const [position, setPosition] = useState<number>(0)
  const handleNavigation = (event : React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    let componentToRender;

  switch (event.currentTarget.id) {
    case "":
    case "about":
      componentToRender = <About />;
      setPosition(0)
      break;
    case "projects":
      componentToRender = <Projects />;
      setPosition(1)
      break;
    case "contact":
      componentToRender = <Contact />;
      setPosition(2)
      break;
    case "game":
      componentToRender = <Game />;
      setPosition(3)
      break;
    default:
      componentToRender = <About />;
      setPosition(0)
  }
    setNavigation(componentToRender)
  }

  return (
    <div className='relative'>
      <Navbar handleNavigation={handleNavigation} position={position}/>
      {navigation}
      <canvas id="canvas" className='absolute top-0 z-1'></canvas>
    </div>
  );
}

export default App;
