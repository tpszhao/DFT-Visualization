import React, {useRef, useEffect} from 'react';


function DrawingPad() {
  const canvasRef = useRef(null);
  const origin = {x:400,y:250}

  const isDrawing = useRef(false)
  const prevpos = useRef(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.width = 2*origin.x;
    canvas.height = 2*origin.y;
    const context = canvas.getContext('2d');
    context.translate(origin.x,origin.y);
  })

  const currentpoint = e =>{
    const {top,left} = canvasRef.current.getBoundingClientRect();
    return {x:e.clientX - left - origin.x, y:e.clientY - top - origin.y}
  }


  const mousedown = e => {
    isDrawing.current = true;
    prevpos.current = currentpoint(e);
  }

  const mousemove = e => {
    if (isDrawing.current){
      const context = canvasRef.current.getContext('2d');
      const {x,y} = currentpoint(e);
      context.beginPath();
      context.moveTo(prevpos.current.x,prevpos.current.y);
      context.lineTo(x,y);
      prevpos.current = {x,y};
      context.stroke();
    }
  }

  const mouseup = e => {
    isDrawing.current = false;
  }


  return (
      <canvas ref={canvasRef} onMouseMove={mousemove} onMouseUp = {mouseup} onMouseDown = {mousedown} onMouseLeave = {mouseup}/>
  )
}

export default DrawingPad;
