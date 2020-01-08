import React, {useRef,useState} from 'react'

export default function DraggableContainer(props) {
    const [offset, setOffset] = useState({x:0,y:0});
    const containerStyle={
        position:'absolute',
        zIndex:50,
        left:offset.x,
        top:offset.y};
    const draggerStyle = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'lightblue',
        cursor:'pointer',
        Width:200,padding:20
    }
    const draggerRef = useRef(null);
    const isDragging = useRef(false);

    const dragstart = e =>{
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
    return (<div style={containerStyle}>
                <div ref={draggerRef} style={draggerStyle}
                onMouseDown={dragstart}
                onMouseMove={drag}
                onMouseUp={stopdrag}
                onMouseLeave={stopdrag}>Click Here to Drag</div>
                {props.children}
            </div>
    )
}
