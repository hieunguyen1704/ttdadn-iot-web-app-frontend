import React from 'react';
import './MotorState.scss'
const MotorState = (props) =>{
    return(<span className={props.isOn ? "circle hvr-sweep-to-bottom" : "circle hvr-sweep-to-bottom padding-5"}>{props.isOn ? "ON" : "OFF"}</span>
    );
}
export default MotorState;