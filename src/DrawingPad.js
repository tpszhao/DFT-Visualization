import React, {useRef, useEffect} from 'react';
import DraggableContainer from './DraggableContainer'

export default function DrawingPad(props){
  const {width,height,hide,addpoint} = props;
  const origin = {x:width/2,y:height/2};

  const hideStyle = {display:hide ?"none" : ""};

  const canvasRef = useRef(null);
  const drawMode = useRef("stroke");
  const isDrawing = useRef(false);
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

  const addline = (x,y,prevX,prevY)=>{
    const [distX,distY] = [x-prevX,y-prevY];
    const dist = Math.hypot(distX,distY);
    const steps = Math.max(1,dist/20);
    for (let i = 1; i < steps; i++) {
      const shiftX = i*distX/steps;
      const shiftY = i*distY/steps;
      addpoint(prevX+shiftX,prevY+shiftY,true);    
    }
    addpoint(x,y,true);
  }

  const lineStart = e =>{
    const {x,y}=currentpoint(e);
    if (prevPos.current == null){
      addpoint(x,y,false);
      prevPos.current = {x,y};
    } else {
      const context = canvasRef.current.getContext('2d');
      context.beginPath();
      context.moveTo(prevPos.current.x,prevPos.current.y);
      context.lineTo(x,y);
      context.stroke();
      addline(x,y,prevPos.current.x,prevPos.current.y);
      drawMode.current == "segment"? prevPos.current = null : prevPos.current = {x,y};
    }
  }

  const strokestart = e => {
    const {x,y} = currentpoint(e);
    addpoint(x,y,false);
    prevPos.current = {x,y};
  }

  const mousedown = e=> {
    isDrawing.current = true;
    switch(drawMode.current){
      case "tracing":
      case "segment":
        lineStart(e);
        break;
      case "stroke":
        strokestart(e);
        break;
      default:
    }
  }

  const stroke = e => {
    const context = canvasRef.current.getContext('2d');
    const {x,y} = currentpoint(e);
    context.beginPath();
    context.moveTo(prevPos.current.x,prevPos.current.y);
    context.lineTo(x,y);
    prevPos.current = {x,y};
    context.stroke();
    addpoint(x,y,true);
  }

  const mousemove = e=>{
    if(isDrawing.current && drawMode.current != "segment"){
      stroke(e);
    }
  }

  const stopdrawing = e => {
    isDrawing.current = false;
    addpoint(0,0,true,"new");
  }

  const reset = ()=>{
    addpoint(0,0,false,"reset");
    const context = canvasRef.current.getContext('2d');
    context.resetTransform();
    context.clearRect(0,0,width,height);
    context.translate(origin.x,origin.y);
    prevPos.current = null;
  }

  const drawModeChange = str =>{
    drawMode.current = str;
    if (str == "segment"){
      prevPos.current = null;
    }
  }


  return (
    <>
      <canvas ref={canvasRef} style={hideStyle}
        onMouseDown = {mousedown} 
        onMouseMove={mousemove} 
        onMouseUp = {stopdrawing} 
        onMouseLeave = {stopdrawing}/>
      
      <DraggableContainer zIndex={20}>
        <div style={{display:'flex',flexDirection:"column"}}>
          <button onClick={props.toggleanimation}>{hide?"Stop":"Start"} Animation</button>            
          <button onClick={reset} style={hideStyle}>Clear</button>  
          <button onClick={()=>drawModeChange("stroke")} style={hideStyle}>Stroke</button>
          <button onClick={()=>drawModeChange("tracing")} style={hideStyle}>Trace</button>
          <button onClick={()=>drawModeChange("segment")} style={hideStyle}>Segment</button>
        </div>
      </DraggableContainer>

    </>

  )
}

