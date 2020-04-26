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
    },
    {
      value: 100,
      label: '100°C',
    }    
  ];
  const humidMarks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 30,
      label: '30%',
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
          value: 300,
          label: '300',
        },
        {
            value: 600,
            label: '600',
        },
        {
          value: 1023,
          label: '1023',
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
        aria-labelledby= {props.type}
        step={props.step}
        valueLabelDisplay="auto"
        marks = {props.type === 'temperature' ? tempMarks : props.type === 'humidity' ? humidMarks : lightMarks}
        onChange={props.change}
      />
    </div>
  );
};
export default SliderContainer;
