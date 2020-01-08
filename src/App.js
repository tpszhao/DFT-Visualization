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
    const [animate, setAnimate] = useState(false);
    const [width,height] = useWindowSize();

    useEffect(()=>{
        setAnimate(false)
    },[width,height])
    
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

    return (<>  
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

