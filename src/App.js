import React,{useRef,useState} from 'react';
import DrawingPad from './DrawingPad';
import Epicycle from './Epicycle'
import './App.css';


export default function App() {
    const path = useRef([]);
    const [test,setTest] = useState(0);

    const pathAddpoint = (x,y)=>{
        path.current.push({x,y});
    }


    return (
        <div className = "wrapper">
            <button onClick={()=> setTest(test + 1)} style={{}}>Test</button>
            <DrawingPad className = "bottom right above" 
                addpoint = {pathAddpoint}/>
            <Epicycle className = "right" width = "800" height = "625"
                origin = {{x:400,y:125}}
                destination = {{x:400,y:375}}
                path = {path.current} 
                idx = {test} 
                compute_x = {true}/>
            <Epicycle className = "bottom" width = "1200" height = "500"
                origin = {{x:400,y:250}}
                destination = {{x:800,y:250}}
                path = {path.current} 
                idx = {test} 
                compute_y = {true}/>
            <Epicycle className = "bottom right" width = "800" height = "500"
                origin = {{x:400,y:250}}
                destination = {{x:400,y:250}}
                path = {path.current} 
                idx = {test} 
                compute_y = {true} compute_x = {true}/>
        </div>
    )
}

