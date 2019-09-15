import React, {useState} from 'react';
import FourierX from './FourierX';
import MainCanvas from './MainCanvas';

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
            <MainCanvas 
                path = {path} 
                addpoint = {addPoint}
                isdrawing = {isdrawing} 
                changeisdrawing = {changeIsDrawing}/>
            <FourierX
                path = {path}
                idx = {idx}/>
            <button onClick={()=>setIdx((idx+1)%path.length)}>Index is {idx}</button>
        </div>
    )
}

export default Container;
