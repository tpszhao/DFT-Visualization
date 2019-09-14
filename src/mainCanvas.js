import React, {useRef, useEffect} from 'react';


function mainCanvas({pathx, pathy, addpoint, isdrawing, changeisdrawing}) {
  const canvasRef = useRef(null);
  
  const [xoffset, yoffset] = [400,300];
  

  useEffect(()=>{
    draw();
    drawaxis();
  })
  
  const draw = () => {
    const canvas = canvasRef.current;        
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,800,600)
    ctx.save();
    ctx.translate(xoffset,yoffset);
    const length = pathx.length;
    if (length > 0){
      ctx.moveTo(pathx[0], pathy[0]);
      ctx.beginPath();
      for (var i = 1; i < length; i++){
        ctx.lineTo(pathx[i], pathy[i]);
      }
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  }
  
  const drawaxis = () => {
    const canvas = canvasRef.current;        
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.translate(xoffset,yoffset);
    ctx.beginPath();
    ctx.moveTo(-400, 0);
    ctx.lineTo(400,0);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(0,-300);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  function getpos(e){
    const canvas = canvasRef.current; 
    const rect = canvas.getBoundingClientRect();
    return {
      x : e.clientX - rect.left - xoffset,
      y : e.clientY - rect.top - yoffset
    }
  }
  function recordpos(e){
    const mouseposition = getpos(e);
    addpoint(mouseposition.x, mouseposition.y)
  }

  function mousedown(e){
    changeisdrawing(true);
    recordpos(e);
  }

  function mousemove(e){
    if (isdrawing ){
      recordpos(e)
    }
  }

  const mouseup = () => {
    changeisdrawing(false);
  }
  
  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
      onMouseDown={mousedown}
      onMouseUp={mouseup}
      onMouseMove={mousemove}
    />
  )
}

export default mainCanvas;
