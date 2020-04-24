import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./SliderContainer.scss";


const tempMarks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 35,
      label: '35°C',
    },
    {
      value: 50,
      label: '50°C',
    }
  ];
  const humiMarks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 60,
      label: '60%',
    },
    {
      value: 100,
      label: '100%',
    }
    ]
    const lightMarks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 1000,
          label: '1000',
        },
        {
            value: 2000,
            label: '2000',
        },
        {
          value: 4095,
          label: '4095',
        }    
    ];  
const SliderContainer = (props) => {
  return (
    <div className="slider-container">
      <Typography id={props.type}  style={{textTransform:'capitalize'}} gutterBottom>
        {props.type}
      </Typography>
      <Slider
        min={0}
        max={props.max}
        value={props.value}
        // getAriaValueText={this.valueText}
        aria-labelledby= {props.type}
        step={props.step}
        valueLabelDisplay="auto"
        marks = {props.type === 'temperature' ? tempMarks : props.type === 'humidity' ? humiMarks : lightMarks}
        onChange={props.change}
      />
    </div>
  );
};
export default SliderContainer;
