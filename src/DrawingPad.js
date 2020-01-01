import React, {useRef, useEffect} from 'react';


function DrawingPad() {
  const canvasRef = useRef(null);
  const axisRef = useRef(null);
  const origin = {x:400,y:250};

  useEffect(()=>{
    const canvas = canvasRef.current;        
    const axis = axisRef.current;
    [canvas,axis].forEach(
      item =>{
        item.width = 2*origin.x;
        item.height = 2*origin.y;
        item.style.position = "absolute";
        const context = item.getContext('2d');
        context.beginPath();
        context.arc(origin.x, origin.y, 50, 0, 2 * Math.PI);
        context.stroke(); 
        if (item === axis){
          context.beginPath();
          context.arc(origin.x+20, origin.y+40, 50, 0, 2 * Math.PI);
          context.stroke(); 
        }
      }
    )

  })

  return (
    <div>
      <canvas ref={canvasRef}/>
      <canvas ref={axisRef}/>
    </div>
  )
}

export default DrawingPad;
