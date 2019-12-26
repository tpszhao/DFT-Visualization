import React, {useState} from 'react';
import FourierX from './FourierX';
import FourierY from './FourierY';
import MainCanvas from './MainCanvas';
import './App.css';


function App() {
    const [path, setPath] = useState([]);

    const [isdrawing, setIsDrawing] = useState(false);
    const [idx, setIdx] = useState(0);

    
    function addPoint(a,b){
        setPath([...path, {x:a,y:b}]);
    }
    function changeIsDrawing(bool){
        setIsDrawing(bool);
    }
    function nextindex(){
        setIdx((idx + 1)% path.length)
    }


    return (
        <div>
            <div className = "wrapper">
                <div className = "top-left">
                    <button onClick={()=>{
                        setPath([]);
                        setIsDrawing(false);
                        setIdx(0);
                    }}>Clear</button>
                    <button onClick={nextindex}>Next Index</button>
                </div>
                <MainCanvas className = "bottom-right"
                    path = {path} 
                    addpoint = {addPoint}
                    isdrawing = {isdrawing} 
                    changeisdrawing = {changeIsDrawing}/>
                <FourierX className = "top-right"
                    path = {path}
                    idx = {idx}
                    offset = {{x:400,y:125}}
                    origin = {{x:400,y:375}}/>
            </div>
        </div>
    )
}

export default Container;
