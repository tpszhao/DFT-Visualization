import React, {useRef, useEffect} from 'react';


function FourierX({pathx,pathy,fourier}) {
  const canvasRef = useRef(null);
  const [xoffset, yoffset] = [400,300];
  
  useEffect(()=>{
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
  })

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
    />
  )
}

export default FourierX;
