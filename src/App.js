import React,{useRef,useState} from 'react';
import DrawingPad from './DrawingPad';
import AnimationController from './AnimationController'
import './App.css';


export default function App() {
    const path = useRef([]);
    const [animation,setAnimation] = useState(false);

    const pathAddpoint = (x,y)=>{
        path.current.push({x,y});
    }

    const stopAnimation = ()=>{
        if(animation){
            setAnimation(false);
        }
    }

    return (
        <div className = "wrapper">
            <DrawingPad className = "bottom right" 
                addpoint = {pathAddpoint} 
                stopanimation = {stopAnimation}/>
            <AnimationController animation = {animation}>

            </AnimationController>
        </div>
    )
}

