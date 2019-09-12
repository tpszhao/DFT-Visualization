import React, {useRef, useEffect, useState} from 'react';
import FourierX from './FourierX';
import App from './App';

function Container() {
    const [pathx, setPathx] = useState([]);
    const [pathy, setPathy] = useState([]);
    const [isdrawing, setIsDrawing] = useState(false);
    const [fourier, setFourier] = useState(false);
    const [index, setIndex] = useState(0)
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
                fourier = {fourier} />
            <button onClick = {() => {
                setFourier(!fourier);
            }}>DFT</button>
        </div>
    )
}

export default Container;
