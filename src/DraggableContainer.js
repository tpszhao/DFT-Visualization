import React, {useRef,useState} from 'react'

export default function DraggableContainer() {
    const draggerRef = useRef(null);
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
        <div style={{position:'absolute',
                    zIndex:80,
                    left:offset.x}}>
            <div ref={draggerRef} style={{backgroundColor:'lightblue'}}
                onMouseDown={mousedown} 
                onMouseMove={mousemove}
                onMouseLeave = {mouseup}
                onMouseUp={mouseup}>Click Here to Drag</div>
            {props.children}
        </div>
    )
}
