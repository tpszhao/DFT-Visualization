import React, {useRef} from 'react';


function FourierX() {
  const canvasRef = useRef(null);
  
  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="600"
    />
  )
}

export default FourierX;
