import React, {useRef} from 'react'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Slider from '@material-ui/core/Slider';



export default function ImageCanvasMenu(props) {
    const UploadButton = useRef(null);
    const {switchvalue, onswitch,imageChange} = props;
    const {hideImage, toggleHideImage} = props;
    const {scale,scaleChange} = props;

    return (
        <FormGroup column>
            <FormLabel 
                component="legend" 
                style={{color:'black',margin:5}}>Reference Image</FormLabel>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch checked={switchvalue} onChange={onswitch} color="primary"/>
                    }
                    label="Drag Image"/>
                <FormControlLabel
                    control={
                        <Switch checked={hideImage} onChange={toggleHideImage} color="primary"/>
                    }
                    label="Hide Image"/>
            </FormGroup>
            <Button 
                variant="contained" 
                color="primary"
                onClick={()=>{UploadButton.current.click()}}>Upload Image</Button>

            <FormLabel 
                component="legend" 
                style={{color:'black',margin:5}}>Image Scale</FormLabel>

            <Slider
                value={scale}
                onChange={scaleChange}
                min = {0}
                max = {200}
                aria-labelledby="input-slider"/>
            
            <input 
                ref={UploadButton}
                type="file" 
                accept="image/*" 
                onChange={imageChange}
                style={{display:'none'}}/>
        </FormGroup>
    )
}
