import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

export default function StrokeStyleMenu(props) {
    const {values,onChange,defaultvalue} = props;
    return (<FormGroup column>
                <FormLabel 
                    component="legend" 
                    style={{color:'black',margin:5}}>Stroke Style</FormLabel>
                <RadioGroup name="StrokeStyle" onChange={onChange} row
                    defaultValue={defaultvalue.current}>
                    {values.map((value,i)=>{
                        return (<FormControlLabel 
                                    value={value} 
                                    label={value} 
                                    labelPlacement="end" 
                                    control={<Radio color="primary"/>}/>)
                    })}
                </RadioGroup>
        </FormGroup>
    )
}



