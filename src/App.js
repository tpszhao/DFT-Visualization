import React,{useRef,useState} from 'react';
import DrawingPad from './DrawingPad';
import './App.css';


function App() {
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
            <DrawingPad className = "bottom right" addpoint = {pathAddpoint} stopanimation = {stopAnimation}/>
        </div>
    )
}

export default App;
