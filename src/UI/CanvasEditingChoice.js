import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function CanvasEditingChoice(props) {
    const {onChange,value,style} = props;
    return (
        <RadioGroup name="CanvasChoice" 
            onChange={onChange} 
            value={value}
            style={style} row>
            <FormControlLabel
                value={false}
                control={<Radio color="primary" />}
                label="Edit Drawing"
                labelPlacement="top"/>
            <FormControlLabel
                value={true}
                control={<Radio color="primary" />}
                label="Edit Reference Image"
                labelPlacement="top"/>
        </RadioGroup>
    )
}
