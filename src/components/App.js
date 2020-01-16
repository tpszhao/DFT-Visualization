import React,{useRef,useState,useEffect} from 'react';
import DrawingPad from './DrawingPad';
import Epicycle from './Epicycle'
import './App.css';

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
    function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;}

export default function App() {
    const path = useRef([]);
    const pathChanged = useRef(false);
    const [animate, setAnimate] = useState(false);
    const [width,height] = useWindowSize();

    useEffect(()=>{
        setAnimate(false)
    },[width,height])
    
    const pathAddpoint = (x,y,connected = true)=>{
        pathChanged.current = true;
        path.current.push({x,y,connected});
    }

    const resetPath = ()=>{
        pathChanged.current = true;
        path.current=[];
    }
    
    const toggleAnimation = ()=> {
        if(pathChanged.current){
            pathChanged.current = true;
            const newpath = path.current.slice();
            path.current = newpath;
        }
        setAnimate(!animate)
    }

    return (<>  
                <DrawingPad className="top center absolute" width={width} height={height} 
                    addpoint={pathAddpoint} 
                    resetpath={resetPath}
                    toggleanimation = {toggleAnimation}
                    hide={animate}/>  
                <Epicycle className="center absolute" width={width} height={height}
                    animate={animate} 
                    path={path.current}/>        
            </>
    )
}

