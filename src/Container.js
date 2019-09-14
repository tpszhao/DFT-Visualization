import React, {useState} from 'react';
import FourierX from './FourierX';
import mainCanvas from './mainCanvas';

function Container() {
    const [pathx, setPathx] = useState([]);
    const [pathy, setPathy] = useState([]);
    const [isdrawing, setIsDrawing] = useState(false);
    


    function addPoint(x,y){
        setPathx([...pathx, x]);
        setPathy([...pathy, y]);
    }
    function changeIsDrawing(bool){
        setIsDrawing(bool)
    }

    return (
        <div>
            <mainCanvas 
                pathx = {pathx} 
                pathy = {pathy} 
                addpoint = {addPoint}
                isdrawing = {isdrawing} 
                changeisdrawing = {changeIsDrawing}/>
            <FourierX />
        </div>
    )
}

export default Container;
