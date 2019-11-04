import React, {useState} from 'react';
import FourierX from './FourierX';
import FourierY from './FourierY';
import MainCanvas from './MainCanvas';
import './Container.css';

//D3js

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
    function nextindex(){
        setIdx((idx+1)%path.length);
    }


    return (
        <div>
            <div className = "wrapper">
                <div className = "topleft">
                    <button onClick={nextindex}>Index is {idx}</button>
                    <button onClick={()=>{
                        setPath([]);
                        setIsDrawing(false);
                        setIdx(0);
                    }}>Clear</button>
                </div>
                <MainCanvas className = "maincanvas"
                    path = {path} 
                    addpoint = {addPoint}
                    isdrawing = {isdrawing} 
                    changeisdrawing = {changeIsDrawing}/>
            </div>
        </div>
    )
}

export default Container;
