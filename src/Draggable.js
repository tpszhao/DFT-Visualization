import React, {useRef,useState} from 'react'

export default function Draggable() {
    const containerRef = useRef(null);
    const [offset, setOffset] = useState({x:0,y:0});
    const prevPos = useRef(0);
    const isDragging = useRef(false);

    const mousedown = e =>{
        prevPos.current = e.clientX;
        isDragging.current=true
    }

    const mousemove = e=>{
        if(isDragging.current){
            const x = e.clientX;
            const prevX = prevPos.current;
            prevPos.current = x;
            setOffset({x:offset.x + x - prevX,y:offset.y});
        }
    }

    const mouseup = ()=>{
        isDragging.current = false;
    }


    return (
        <div ref={containerRef} 
            onMouseDown={mousedown} 
            onMouseMove={mousemove}
            onMouseLeave = {mouseup}
            onMouseUp={mouseup}
            style={{backgroundColor:'lightblue',position:'absolute',zIndex:80,left:offset.x}}>
            sldkfjaldkfhkasdjfhlakjdfhlaksjdfhlkasjdfhlaksdjfh

        </div>
    )
}
