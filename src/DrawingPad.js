import React, {useRef, useEffect, useState} from 'react';


export default function DrawingPad(props){
  const canvasRef = useRef(null);
  const {width,height,hide,addpoint} = props;
  const origin = {x:width/2,y:height/2};
  const isDrawing = useRef(false)
  const prevpos = useRef(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.className = props.className;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.resetTransform();
    context.clearRect(0,0,width,height);
    context.translate(origin.x,origin.y);
  },[width,height])

  const currentpoint = e =>{
    const {top,left} = canvasRef.current.getBoundingClientRect();
    return {x:e.clientX - left - origin.x, y:e.clientY - top - origin.y}
  }


  const mousedown = e => {
    isDrawing.current = true;
    const {x,y} = currentpoint(e);
    addpoint(x,y,false);
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
      addpoint(x,y,true);
    }
  }

  const mouseup = e => {
    isDrawing.current = false;
    addpoint(0,0,true,"new");
  }

  const reset = ()=>{
    addpoint(0,0,false,"reset");
    const context = canvasRef.current.getContext('2d');
    context.resetTransform();
    context.clearRect(0,0,width,height);
    context.translate(origin.x,origin.y);
  }


  return (
    <>
      <canvas ref={canvasRef} 
        onMouseMove={mousemove} 
        onMouseUp = {mouseup} 
        onMouseDown = {mousedown} 
        onMouseLeave = {mouseup}
        style={{display:hide ?"none" : ""}}/>
      <div style={{zIndex:50,position:'absolute'}}>
        <button onClick={props.toggleanimation}>Toggle Animation</button>            
        <button onClick={reset} style={{display:hide ?"none" : ""}}>Clear</button>  
      </div>
    </>

  )
}

