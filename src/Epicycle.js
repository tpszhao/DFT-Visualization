import React,{useRef, useEffect,useState} from 'react'

export default function Epicycle(props) {
  const {path = [],animate=false,width,height} = props;
  const [Idx, setIdx] = useState(0);

  const canvasRef = useRef(null);
  const origin = {x:width/2,y:height/2};
  const DFT = useRef([]);

  useEffect(()=>{
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0,0,width,height)
    DFTcompute();
    setIdx(0);
  },[path])

  useEffect(() => {
    let interval = null;
      if (animate) {
        interval = setInterval(() => {
          draw();
          setIdx(Idx => Idx + 1);
        }, 50);
      } else {
        clearInterval(interval);
      }
      return () => clearInterval(interval); // cleanup function
    },[animate,Idx]);
  

  const draw = ()=>{
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0,0,width,height)
    context.save();
    context.translate(origin.x,origin.y);
    let sequence = DFT.current;
    let len = sequence.length;
    if (len > 1){
      let a = 0;
      let b = 0;
      let {x,y} = path[Idx%len];
      for (var i = 0; i < len; i++){
        let norm = sequence[i].norm/len;
        let angle = sequence[i].angle;
        let speed = sequence[i].speed;
        context.beginPath();
        context.arc(a,b,norm,0,2*Math.PI);
        context.stroke();
        context.beginPath();
        context.moveTo(a, b);
        let phase = (2*Math.PI*Idx*speed)/len
        a += norm*Math.cos(angle + phase);
        b += norm*Math.sin(angle + phase);
        context.lineTo(a,b);
        context.stroke();
        if (dist(a,b,x,y) < 1){break;}
      }
      context.beginPath();
      context.moveTo(a,b);
      context.lineTo(x,y);
      context.stroke();
    }
    context.restore();

  }
  const dist = (a,b,x,y)=>{
    return Math.sqrt(Math.pow(x-a,2)+Math.pow(y-b,2));
  }
  const DFTcompute = ()=>{
    let sequence = [];
    let len = path.length;
    for (let k = 0; k<len;k++) {
      let re = 0;
      let im = 0;
      for (let n = 0; n<len;n++){
        const phi = (Math.PI*2*k*n)/len;
          re += path[n].x * Math.cos(phi);
          im -= path[n].x * Math.sin(phi);

          im += path[n].y * Math.cos(phi);
          re += path[n].y * Math.sin(phi);
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
      width ={width} 
      height = {height}/>
  )
}




