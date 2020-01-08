import React, {useRef, useEffect} from 'react';
import DraggableContainer from './DraggableContainer'

export default function DrawingPad(props){
  const {width,height,hide,addpoint} = props;
  const origin = {x:width/2,y:height/2};

  const canvasRef = useRef(null);
  const isDrawing = useRef(false)
  const prevPos = useRef(null);

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
    prevPos.current = {x,y};
  }

  const mousemove = e => {
    if (isDrawing.current){
      const context = canvasRef.current.getContext('2d');
      const {x,y} = currentpoint(e);
      context.beginPath();
      context.moveTo(prevPos.current.x,prevPos.current.y);
      context.lineTo(x,y);
      prevPos.current = {x,y};
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
      <DraggableContainer>
        <div style={{display:'flex',flexDirection:"column"}}>
          <button onClick={props.toggleanimation}>{hide?"Stop":"Start"} Animation</button>            
          <button onClick={reset} style={{display:hide ?"none" : ""}}>Clear</button>  
        </div>
      </DraggableContainer>

    </>

  )
}

