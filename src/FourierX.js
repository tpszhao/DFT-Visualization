import React, {useRef, useEffect} from 'react';


function FourierX({path, idx}) {
  const canvasRef = useRef(null);
  const [xoffset, yoffset] = [400,300];
  let DFTseqeuence = [];

  useEffect(()=>{
    const canvas = canvasRef.current;        
    const context = canvas.getContext('2d');
    const length = path.length;
    context.clearRect(0,0,800,600)
    drawaxis(context);
    computeDFT(length);
    draw(context,length);
  })

  const computeDFT = (len)=>{
    DFTseqeuence = [];
    for (let k = 0; k<len;k++){
      let re = 0;
      let im = 0;
      for (let n = 0; n<len;n++){
        const phi = (Math.PI*2*k*n)/len;
        re += path[n].x * Math.cos(phi);
        im -= path[n].x * Math.sin(phi);
      }
      im = im/len;
      re = re/len;
      let size = Math.sqrt(re*re+im*im);
      let args = Math.atan2(im,re);
      DFTseqeuence.push({norm:size,angle:args});
    }
    
  }

  const draw = (ctx, len) => {
    ctx.save();
    ctx.translate(xoffset,yoffset);
    ctx.moveTo(0, 0);
    ctx.beginPath();
    for (var i = 0; i < len; i++){
      let norm = DFTseqeuence[i].norm;
      let angle = DFTseqeuence[i].angle;
      let phase = (2*Math.PI*idx*i)/len
      let x = norm*Math.cos(angle + phase);
      let y = norm*Math.sin(angle + phase);
      ctx.arc(x,y,norm,0,2*Math.PI);
      ctx.lineTo(x, y);
      ctx.translate(x, y);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  const drawaxis = (ctx) => {
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
  
  return (
    <div>
      <canvas ref={canvasRef} width="800" height="600"/>
    </div>
  )
}

export default FourierX;
