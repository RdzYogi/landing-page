import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';
import About from './components/pages/About';
import Projects from './components/pages/Projects';
import anime from 'animejs/lib/anime.es.js';
import { Circle } from './components/helpers/CircleClass';



// Variables for the canvas fade effect
const RefreshInterval = 50;
const FadeAmount = 0.1;
const ExplosionsColors = ["#545454", "#424242", "#4A4A4A", "#333333", "#404040"]
const animationDuration = 500


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
      // const w = canvas.width;
      // const h = canvas.height;
      // const imageData = ctx.getImageData(0, 0, w, h);
      // for (let x = 0; x < w; x++) {
      //   for (let y = 0; y < h; y++) {
      //     const i = (x + y * w) * 4;
      //     imageData.data[i] = Math.floor(imageData.data[i]*FadeAmount);
      //     imageData.data[i + 1] = Math.floor(imageData.data[i + 1]*FadeAmount);
      //     imageData.data[i + 2] = Math.floor(imageData.data[i + 2]*FadeAmount);
      //     imageData.data[i + 3] = 255;
      //   }
      // }
      // ctx.putImageData(imageData, 0, 0);
      // const d2 = new Date();
      // console.log("End fade frame: ", d2.getMilliseconds(), "ms")
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
      clearInterval(interval)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

const handleMouseClick = (event: MouseEvent | TouchEvent )=>{
  // event.preventDefault()
  const color = ExplosionsColors[Math.floor(Math.random() * ExplosionsColors.length)];
  const currentColor = "rgba(60,60,60,0.6)"
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
  const rippleSize = Math.min(150, (canvas.width * .4))
  const ctx = canvas.getContext("2d")
  if (ctx === null) return
  // console.log(ctx.getImageData(0, 0,canvas.width, canvas.height))
  const ripple = new Circle({
    ctx: ctx,
    x: x,
    y: y,
    r: 0,
    fill: currentColor,
    stroke: {
      width: 1,
      color: currentColor
    },
    opacity: 1
  });

  const rippleAnimation = anime({
    targets: ripple ,
    r: rippleSize,
    opacity: 0,
    // easing: "easeOutExpo",
    easing: "easeOutCubic",
    duration: animationDuration,
    complete: removeAnimation
  });
  // console.log(rippleAnimation)
  animations.push(rippleAnimation);
}

  const handleCanvasSize = ()=>{
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    if (canvas === null) return
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
  }

  const handleMouseMove = (event: MouseEvent )=>{
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const x = event.pageX
    const y = event.pageY
    if (canvas === null) return
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (ctx === null) return
    var grd = ctx.createRadialGradient(150, 150, 10, 150, 150, 150);
    grd.addColorStop(0, "#555");
    grd.addColorStop(0.8, "rgba(10,10,10,0)");
    ctx.save()
    ctx.translate(x-150,y-150);
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.restore();
  }

  const [navigation, setNavigation] = useState<React.ReactNode>(<About/>)
  const handleNavigation = (event : React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    let componentToRender;

  switch (event.currentTarget.id) {
    case "":
    case "about":
      componentToRender = <About />;
      break;
    case "projects":
      componentToRender = <Projects />;
      break;
    default:
      componentToRender = <About />;
  }
    setNavigation(componentToRender)
  }

  return (
    <div className='relative'>
      <Navbar handleNavigation={handleNavigation}/>
      {navigation}
      <canvas id="canvas" className='absolute top-0 z-1'></canvas>
    </div>
  );
}

export default App;
