import React,{useRef,useEffect,useState} from 'react'

export default function ImageCanvas(props) {
    const {width,height,image,hideImage,scale=1} = props;
    const [offset, setOffset] = useState({x:0,y:0});

    const canvasRef = useRef(null);
    const isDragging = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.globalAlpha = 0.8;
        context.clearRect(0,0,width,height);
        if(image != null && !hideImage){
            context.drawImage(image,offset.x,offset.y,image.width*scale,image.height*scale)
        }
    }, [image,width,height,hideImage,scale,offset]);

    const dragstart = () =>{
        isDragging.current = true;
    }

    const drag = e=>{
        if(isDragging.current){
            const [x,y] = [e.movementX,e.movementY];
            setOffset({x:offset.x + x,y:offset.y + y});
        }
    }

    const stopdrag = e=>{
        isDragging.current = false;
    }


    
    return (
        <canvas
            ref={canvasRef} 
            style={{position:'absolute',...props.style}}
            className={props.className} 
            width={width} 
            height={height}
            onMouseDown={dragstart}
            onMouseMove={drag}
            onMouseUp={stopdrag}
            onMouseLeave={stopdrag}
        />
    )
}
