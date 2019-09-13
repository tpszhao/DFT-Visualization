import React, {useState} from 'react';
import FourierX from './FourierX';
import App from './App';

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
            <App 
                pathx = {pathx} 
                pathy = {pathy} 
                addpoint = {addPoint}
                isdrawing = {isdrawing} 
                changeisdrawing = {changeIsDrawing}/>
            <FourierX 
                pathx = {pathx}   
                pathy = {pathy} 
                />
        </div>
    )
}

export default Container;
