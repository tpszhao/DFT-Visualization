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
      let size = Math.sqrt(re*re+im*im);
      let args = Math.atan2(im,re);
      DFTseqeuence.push({norm:size,angle:args});
    }
    
  }

  const draw = (ctx, len) => {

    ctx.save();
    ctx.translate(xoffset,yoffset);
    ctx.strokeStyle = "#FF0000";
    let x = 0;
    let y = 0;
    for (var i = 0; i < len; i++){
      let norm = DFTseqeuence[i].norm/len;
      let angle = DFTseqeuence[i].angle;
      ctx.beginPath();
      ctx.arc(x,y,norm,0,2*Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
      let phase = (2*Math.PI*idx*i)/len
      x += norm*Math.cos(angle + phase);
      y += norm*Math.sin(angle + phase);
      ctx.lineTo(x,y);
      ctx.stroke();
    }
    if (len > 0){
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.moveTo(path[idx].x, 0);
      ctx.lineTo(path[idx].x,path[idx].y);
      ctx.stroke();
    }
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
