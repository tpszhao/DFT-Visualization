import React, {useRef, useEffect} from 'react';


function FourierX({path, idx, offset, origin}) {
  const canvasRef = useRef(null);
  let DFTseqeuence = [];

  useEffect(()=>{
    const canvas = canvasRef.current;        
    const context = canvas.getContext('2d');
    context.clearRect(0,0,800,900)
    computeDFT(path.length);
    draw(context,path.length);
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
    ctx.translate(offset.x,offset.y);
    ctx.strokeStyle = "#FF0000";
    let x = 0;
    let y = 0;
    if(len > 0) {
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
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.translate(origin.x - offset.x,origin.y - offset.y);
      ctx.strokeStyle = "blue";
      ctx.lineTo(path[idx].x,path[idx].y);
      ctx.stroke();
    }
    ctx.restore();
  }

  
  
  return (
    <div>
      <canvas ref={canvasRef} width="800" height="900"/>
    </div>
  )
}

export default FourierX;
