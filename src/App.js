import React,{useRef,useState} from 'react';
import DrawingPad from './DrawingPad';
import Epicycle from './Epicycle'
import './App.css';


export default function App() {
    const path = useRef([]);
    const [animate, setAnimate] = useState(false)
    const [idx, setIdx] = useState(0)
    const [width,height]=[800,500];


    const pathAddpoint = (x,y)=>{
        let newpath = path.current.slice();
        newpath.push({x,y});
        path.current = newpath;
        stopAnimation();
    }
    const stopAnimation = ()=>{
        animate && setAnimate(false);
    }

    return (<>
        <div className="wrapper">
            <div className = "grid">
                <DrawingPad className="top center" width={width} height={height} 
                    addpoint={pathAddpoint}/>  
                <Epicycle className="center" width={width} height={height}
                    animate={animate} path={path.current}/>        
            </div>
            <button onClick={()=>{setAnimate(!animate)}}>Toggle Animation</button>            
        </div>
        </>
    )
}

