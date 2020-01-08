import React,{useRef,useState} from 'react';
import DrawingPad from './DrawingPad';
import Epicycle from './Epicycle'
import './App.css';

import Draggable from './Draggable'


export default function App() {
    const path = useRef([]);
    const [animate, setAnimate] = useState(false);
    const width = window.innerWidth;
    const height = window.innerHeight;


    const pathAddpoint = (x,y,connected,special="none")=>{
        switch(special){
            case "reset":
                path.current = [];
                break;
            case "new":
                let newpath = path.current.slice();
                path.current = newpath;
                break;
            default:
                path.current.push({x,y,connected});
                break;
        }
    }
    
    const toggleAnimation = ()=> setAnimate(!animate)

    return (<>  <Draggable/>
                <DrawingPad className="top center absolute" width={width} height={height} 
                    addpoint={pathAddpoint} 
                    toggleanimation = {toggleAnimation}
                    hide={animate}/>  
                <Epicycle className="center absolute" width={width} height={height}
                    animate={animate} 
                    path={path.current}/>        
            </>
    )
}

