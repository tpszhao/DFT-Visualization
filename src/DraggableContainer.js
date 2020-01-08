import React, {useRef,useState} from 'react'

export default function DraggableContainer(props) {
    const [offset, setOffset] = useState({x:0,y:0});
    const containerStyle={
        position:'absolute',zIndex:50,
        left:offset.x,top:offset.y};
    const draggerStyle = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'lightblue',
        cursor:'pointer',
        Width:200,padding:20
    }
    const draggerRef = useRef(null);
    const prevPos = useRef(0);
    const isDragging = useRef(false)

    const dragstart = e =>{
        e.preventDefault();
        prevPos.current = {x:e.clientX,y:e.clientY};
        isDragging.current = true;
    }

    const drag = e=>{
        e.preventDefault();
        if(isDragging.current){
            const {x:prevX,y:prevY} = prevPos.current;
            const [x,y] = [e.clientX,e.clientY];
            prevPos.current = {x,y};
            setOffset({x:offset.x + x - prevX,y:offset.y+y-prevY});
        }
    }

    const stopdrag = e=>{
        e.preventDefault();
        isDragging.current = false;
    }
    return (<div ref={draggerRef} style={containerStyle}>
                <div style={draggerStyle}
                onMouseDown={dragstart}
                onMouseMove={drag}
                onMouseUp = {stopdrag}
                onMouseLeave={stopdrag}
                >Click Here to Drag</div>
                {props.children}
            </div>
    )
}
