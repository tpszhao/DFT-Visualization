import React, {useRef, useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import DraggableContainer from '../UI/DraggableContainer'
import ImageCanvas from './ImageCanvas';
import StrokeStyleMenu from '../UI/StrokeStyleMenu';
import ImageCanvasMenu from '../UI/ImageCanvasMenu';


export default function DrawingPad(props){
  const {width,height,hide,addpoint,resetpath} = props;
  const origin = {x:width/2,y:height/2};

  const hideStyle = {display:hide ?"none" : ""};
  const flexitemStyle = {margin:5}

  const canvasRef = useRef(null);
  const drawMode = useRef("stroke");
  const isDrawing = useRef(false);
  const prevPos = useRef(null);

  const [image, setImage] = useState(null);
  const [editImage, setEditImage] = useState(false);
  const [hideImage, setHideImage] = useState(false);
  const [imageScale, setImageScale] = useState(100);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.resetTransform();
    context.clearRect(0,0,width,height);
    context.translate(origin.x,origin.y);
    drawMode.current = "stroke"
  },[width,height])

  const currentpoint = e =>{
    const {top,left} = canvasRef.current.getBoundingClientRect();
    return {x:e.clientX - left - origin.x, y:e.clientY - top - origin.y}
  }

  const addline = (x,y,prevX,prevY)=>{
    const [distX,distY] = [x-prevX,y-prevY];
    const dist = Math.hypot(distX,distY);
    const steps = Math.max(1,dist/20);
    for (let i = 1; i < steps; i++) {
      const shiftX = i*distX/steps;
      const shiftY = i*distY/steps;
      addpoint(prevX+shiftX,prevY+shiftY,true);    
    }
    addpoint(x,y,true);
  }

  const lineStart = e =>{
    const {x,y}=currentpoint(e);
    if (prevPos.current == null){
      addpoint(x,y,false);
      prevPos.current = {x,y};
    } else {
      const context = canvasRef.current.getContext('2d');
      context.beginPath();
      context.moveTo(prevPos.current.x,prevPos.current.y);
      context.lineTo(x,y);
      context.stroke();
      addline(x,y,prevPos.current.x,prevPos.current.y);
      drawMode.current == "segment"? prevPos.current = null : prevPos.current = {x,y};
    }
  }

  const strokestart = e => {
    const {x,y} = currentpoint(e);
    addpoint(x,y,false);
    prevPos.current = {x,y};
  }

  const mousedown = e=> {
    isDrawing.current = true;
    switch(drawMode.current){
      case "tracing":
      case "segment":
        lineStart(e);
        break;
      case "stroke":
        strokestart(e);
        break;
      default:
    }
  }

  const stroke = e => {
    const context = canvasRef.current.getContext('2d');
    const {x,y} = currentpoint(e);
    context.beginPath();
    context.moveTo(prevPos.current.x,prevPos.current.y);
    context.lineTo(x,y);
    prevPos.current = {x,y};
    context.stroke();
    addpoint(x,y,true);
  }

  const mousemove = e=>{
    if(isDrawing.current && drawMode.current != "segment"){
      stroke(e);
    }
  }

  const stopdrawing = e => {
    isDrawing.current = false;
  }

  const reset = ()=>{
    resetpath();
    const context = canvasRef.current.getContext('2d');
    context.resetTransform();
    context.clearRect(0,0,width,height);
    context.translate(origin.x,origin.y);
    prevPos.current = null;
  }

  const ChangeStokeStyle = str =>{
    drawMode.current = str;
    if (str == "segment"){
      prevPos.current = null;
    }
  }

  const imageChange = e =>{
    if (e.target.files&&e.target.files[0]){
      let FR = new FileReader();
      FR.onload = e=>{
        let img = new Image();
        img.onload = ()=>{
          setImage(img);
        }
        img.src = e.target.result;
      }
      FR.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <>
      <canvas 
        ref={canvasRef} className={props.className} style={hideStyle} 
        width={width} height = {height}
        onMouseDown = {mousedown} 
        onMouseMove = {mousemove} 
        onMouseUp = {stopdrawing} 
        onMouseLeave = {stopdrawing}/>
      <ImageCanvas 
        width = {width} 
        height={height} 
        style={{
          zIndex:hide? 2 : (editImage? 11:9),
          cursor: (!hide && editImage)? 'grab' : ''}}
        zIndex={hide? 2 : (editImage? 11:9)}
        scale={imageScale*0.01}
        image={image}
        hideImage={hideImage}/>
      
      <DraggableContainer zIndex={20}>
        <div style={{display:'flex',flexDirection:'column'}}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={props.toggleanimation}
            style={flexitemStyle}>{hide?"Stop":"Start"} Animation</Button>  
          <Button 
            variant="contained" 
            color="primary" 
            onClick={reset} 
            style={{...hideStyle,...flexitemStyle}}>Clear</Button> 
        </div>

        <div style={{display:hide? 'none':''}}>
          <ImageCanvasMenu
            switchvalue={editImage}
            onswitch={()=> setEditImage(!editImage)}
            hideImage={hideImage}
            toggleHideImage={()=>setHideImage(!hideImage)}
            scale={imageScale}
            scaleChange={(e,val)=>setImageScale(val)}
            imageChange={imageChange}
            />
          <StrokeStyleMenu 
            defaultvalue = {drawMode}
            values={["stroke","tracing","segment"]}
            onChange={e=> ChangeStokeStyle(e.target.value)}/>
        </div>
      </DraggableContainer>

    </>

  )
}

