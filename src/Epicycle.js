import React,{useRef, useEffect,useState} from 'react'

export default function Epicycle(props) {
  const {path = [],animate=false,width,height} = props;
  const [Idx, setIdx] = useState(0);

  const epicycleRef = useRef(null);
  const traceRef = useRef(null);
  const origin = {x:width/2,y:height/2};
  const DFT = useRef([]);




  useEffect(() => {
    [epicycleRef,traceRef].forEach(item=>{
      const canvas = item.current;
      canvas.className = props.className;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.resetTransform();
      context.translate(origin.x,origin.y);
      context.clearRect(-origin.x,-origin.y,width,height);
    })
  }, [width,height])

  useEffect(()=>{
    const context = epicycleRef.current.getContext('2d');
    context.clearRect(-origin.x,-origin.y,width,height);
    DFTcompute();
    setIdx(0);
  },[path])



  useEffect(() => {
    let interval = null;
      if (animate&&path.length > 0) {
        interval = setInterval(() => {
          draw();
          trace();
          setIdx(Idx => Idx + 1);
        }, Math.min(10000/path.length,50));
      } else {
        clearInterval(interval);
        epicycleRef.current.getContext('2d').clearRect(-origin.x,-origin.y,width,height);
        traceRef.current.getContext('2d').clearRect(-origin.x,-origin.y,width,height);
      }
      return () => clearInterval(interval);
    },[animate,Idx]);

  const trace = () => {
    const context = traceRef.current.getContext('2d');
    let len = path.length;
    if (len > 1){
      let idx = Idx % len;
      switch(idx > 0){
        case false:
          context.clearRect(-origin.x,-origin.y,width,height);
          break;
        case true:
          let previdx = path[idx].connected? (idx-1)%len : idx
          context.beginPath();
          context.moveTo(path[previdx].x,path[previdx].y);
          context.lineTo(path[idx].x,path[idx].y);
          context.stroke();
          break;
        default:
      }
    } 
  }
  

  const draw = ()=>{
    const context = epicycleRef.current.getContext('2d');
    context.clearRect(-origin.x,-origin.y,width,height);
    context.strokeStyle = '#669999';
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
        if (Math.hypot(x-a,y-b) < 5 && i > 30){break;}
      }
      context.beginPath();
      context.moveTo(a,b);
      context.lineTo(x,y);
      context.stroke();
    }
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

  return (<>
    <canvas ref = {epicycleRef} style={{zIndex:5}}/>
    <canvas ref = {traceRef} style={{zIndex:5}}/>
  </>)
}




