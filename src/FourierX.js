import React, {useRef, useEffect, useState} from 'react';


function FourierX({pathx, pathy,fourier}) {
  const canvasRef = useRef(null);
  const [xoffset, yoffset] = [400,300];
  const [fourierpath, setFourierPath] = useState([]);

  useEffect(()=>{
    fourier();
    draw();
  })
  
  const fourier = () => {
    const length = pathx.length;
    for (let i=0;i<length; i++){
      let re = 0;
      let im = 0;
      for (let j=0;j<length;j++){
        const theta = (2*Math.PI*i*j)/length;
        re += pathx[j]*Math.cos(theta);
        im -= pathx[j]*Math.sin(theta);
      }
      re = re/length;
      im = im/length;
      let norm = Math.sqrt(re*re + im*im);
      let phi = Math.atan2(re,im);
      let entry = {size:norm,angel:phi}
      setFourierPath([...fourierpath,entry])
    }
  }




  const draw = () => {
    
    const canvas = canvasRef.current;        
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,800,600)
    ctx.save();
    ctx.translate(xoffset,yoffset);
    //const length = pathx.length;
    if (length > 0){
      ctx.moveTo(custompath[0], pathy[0]);
      ctx.beginPath();
      for (i = 1; i < length; i++){
        ctx.lineTo(custompath[i], pathy[i]);
      }
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  }


  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
    />
  )
}

export default FourierX;
