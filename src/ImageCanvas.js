import React,{useRef,useEffect,useState} from 'react'

export default function ImageCanvas(props) {
    const canvasRef = useRef(null);
    const [offset, setOffset] = useState({x:0,y:0});
    const [scale, setScale] = useState(0.74)
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = props.image
        context.clearRect(0,0,props.width,props.height)
        if(props.image == null){
            setOffset({x:0,y:0})
        } else {
            context.drawImage(image,offset.x,offset.y,image.width*0.5,image.height*0.5)
        }
    }, [props.image,props.width,props.height])
    
    
    return (
        <canvas
            ref={canvasRef} 
            style={{position:'absolute',zIndex:props.zIndex}}
            className={props.className} 
            width={props.width} 
            height={props.height}
        />
    )
}
