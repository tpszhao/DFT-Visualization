import React, {useRef, useEffect} from 'react';


export default function DrawingPad(props){
  const canvasRef = useRef(null);
  const {width,height} = props;
  const origin = {x:width/2,y:height/2};
  const isDrawing = useRef(false)
  const prevpos = useRef(null);

  useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.className = props.className;
    canvas.width = width ;
    canvas.height = height ;
    const context = canvas.getContext('2d');
    context.translate(origin.x,origin.y);
  },[])

  const currentpoint = e =>{
    const {top,left} = canvasRef.current.getBoundingClientRect();
    return {x:e.clientX - left - origin.x, y:e.clientY - top - origin.y}
  }


  const mousedown = e => {
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
    <>
      <canvas ref={canvasRef} 
        onMouseMove={mousemove} 
        onMouseUp = {mouseup} 
        onMouseDown = {mousedown} 
        onMouseLeave = {mouseup}
        onClick={props.onClick}
        />
    </>

  )
}

