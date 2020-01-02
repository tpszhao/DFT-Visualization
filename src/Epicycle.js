import React,{useRef, useEffect} from 'react'

export default function Epicycle(props) {
  const canvasRef = useRef(null);

  const {path = [], idx = 0, compute_x = false, compute_y=false, origin, destination} = props;
  const DFT = useRef([]);

  useEffect(()=>{
    DFTcompute();
    draw();
  })



  const draw = ()=>{
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0,0,props.width,props.height)
    context.save();
    context.translate(origin.x,origin.y);
    let sequence = DFT.current;
    let len = sequence.length;
    if (len > 1){
      let x = 0;
      let y = 0;
      for (var i = 0; i < len; i++){
        let norm = sequence[i].norm/len;
        let angle = sequence[i].angle;
        let speed = sequence[i].speed;
        context.beginPath();
        context.arc(x,y,norm,0,2*Math.PI);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y);
        let phase = (2*Math.PI*idx*speed)/len
        x += norm*Math.cos(angle + phase);
        y += norm*Math.sin(angle + phase);
        context.lineTo(x,y);
        context.stroke();
      }
      context.beginPath();
      context.moveTo(x,y);
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.translate(destination.x,destination.y);
      context.lineTo(path[idx%len].x,path[idx%len].y);
      context.stroke();
    }
    context.restore();

  }

  const DFTcompute = ()=>{
    let sequence = [];
    let len = path.length;
    for (let k = 0; k<len;k++) {
      let re = 0;
      let im = 0;
      for (let n = 0; n<len;n++){
        const phi = (Math.PI*2*k*n)/len;
        if(compute_x){
          re += path[n].x * Math.cos(phi);
          im -= path[n].x * Math.sin(phi);
        }
        if(compute_y){
          im += path[n].y * Math.cos(phi);
          re += path[n].y * Math.sin(phi);
        }
      }
      let size = Math.sqrt(re*re+im*im);
      let args = Math.atan2(im,re);
      sequence.push({norm:size,angle:args,speed:k})
    }
    sequence.sort((a,b)=> b.norm - a.norm)
    DFT.current = sequence;
  }

  return (
    <canvas ref = {canvasRef} 
      className= {props.className}
      width ={props.width} 
      height = {props.height}/>
  )
}




