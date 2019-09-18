import React, {useState} from 'react';
import FourierX from './FourierX';
import MainCanvas from './MainCanvas';
import './Container.css';

function Container() {
    const [path, setPath] = useState([]);
    const [isdrawing, setIsDrawing] = useState(false);
    const [idx, setIdx] = useState(0);


    
    function addPoint(a,b){
        setPath([...path, {x:a,y:b}]);
    }
    function changeIsDrawing(bool){
        setIsDrawing(bool);
    }


    return (
        <div>
            <div className = "wrapper">
                <MainCanvas className = "maincanvas"
                    path = {path} 
                    addpoint = {addPoint}
                    isdrawing = {isdrawing} 
                    changeisdrawing = {changeIsDrawing}/>
                <FourierX className = "fouriertop"
                    path = {path}
                    idx = {idx}
                    offset = {{x:400,y:300}}
                    origin = {{x:400,y:600}}/>
            </div>
            <button onClick={()=>setIdx((idx+1)%path.length)}>Index is {idx}</button>
        </div>
    )
}

export default Container;
