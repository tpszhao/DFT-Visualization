import React, {useRef, useEffect} from 'react';


function MainCanvas({className, path, addpoint, isdrawing, changeisdrawing}) {
  const canvasRef = useRef(null);
  const [xoffset, yoffset] = [400,300];
  

  useEffect(()=>{
    const canvas = canvasRef.current;        
    const context = canvas.getContext('2d');
    context.clearRect(0,0,800,600)
    drawaxis(context);
    draw(context,path.length);
  })

  const drawaxis = (ctx) => {
    ctx.clearRect(0,0,800,600);
    ctx.beginPath();
    ctx.moveTo(400,0);
    ctx.lineTo(400,600);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0,300);
    ctx.lineTo(800,300);
    ctx.stroke();
  }

  const draw = (ctx, len) => {
    ctx.save();
    ctx.translate(xoffset,yoffset);
    if (len > 0){
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (var i = 1; i < len; i++){
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.stroke();
      ctx.closePath();
    }
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
      className = {className}
      ref={canvasRef}
      width="800"
      height="600"
      onMouseDown={mousedown}
      onMouseUp={mouseup}
      onMouseMove={mousemove}
    />
  )
}

export default MainCanvas;
