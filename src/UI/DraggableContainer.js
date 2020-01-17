import React, {useRef,useState} from 'react'

export default function DraggableContainer(props) {
    const [offset, setOffset] = useState({x:0,y:0});
    const containerRef = useRef(null);
    const containerStyle={
        position:'absolute',
        zIndex:props.zIndex,
        left:offset.x,
        top:offset.y, 
        cursor:'pointer',
        border:'thick double #3f51b5',
        backgroundColor:'white',
        padding: 30};
    
    const isDragging = useRef(false);

    const dragstart = e =>{
        if(e.target == containerRef.current){
            isDragging.current = true;
        }
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
    return (<div 
                ref={containerRef}
                style={containerStyle}
                onMouseDown={dragstart}
                onMouseMove={drag}
                onMouseUp={stopdrag}
                onMouseLeave={stopdrag}>
                {props.children}
            </div>
    )
}
