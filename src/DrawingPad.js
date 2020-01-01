import React, {useRef, useEffect} from 'react';


export default function DrawingPad(props){
  const canvasRef = useRef(null);
  const origin = {x:400,y:250}

  const isDrawing = useRef(false)
  const prevpos = useRef(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.className = props.className;
    canvas.width = 2*origin.x;
    canvas.height = 2*origin.y;
    const context = canvas.getContext('2d');
    context.translate(origin.x,origin.y);
  },[])

  const currentpoint = e =>{
    const {top,left} = canvasRef.current.getBoundingClientRect();
    return {x:e.clientX - left - origin.x, y:e.clientY - top - origin.y}
  }

  const mousedown = e => {
    props.stopanimation();
    isDrawing.current = true;
    const {x,y} = currentpoint(e);
    props.addpoint(x,y);
    prevpos.current = {x,y};
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
      props.addpoint(x,y);
    }
  }

  const mouseup = e => {
    isDrawing.current = false;
  }


  return (
      <canvas ref={canvasRef} 
        onMouseMove={mousemove} 
        onMouseUp = {mouseup} 
        onMouseDown = {mousedown} 
        onMouseLeave = {mouseup}/>
  )
}

