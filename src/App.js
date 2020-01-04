import React,{useRef,useState} from 'react';
import DrawingPad from './DrawingPad';
import Epicycle from './Epicycle'
import './App.css';


export default function App() {
    const path = useRef([]);
    const [animate, setAnimate] = useState(false);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const pathAddpoint = (x,y)=>{
        let newpath = path.current.slice();
        newpath.push({x,y});
        path.current = newpath;
        stopAnimation();
    }
    const stopAnimation = ()=>{
        setAnimate(false);
    }

    return (<>
            <div>
                <DrawingPad className="top center absolute" width={width} height={height} 
                    addpoint={pathAddpoint}/>  
                <Epicycle className="center absolute" width={width} height={height}
                    animate={animate} path={path.current}/>        
            <button className="absolute top" onClick={()=>{setAnimate(!animate)}}>Toggle Animation</button>            
            </div>
        </>
    )
}

