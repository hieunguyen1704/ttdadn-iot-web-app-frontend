import React, { Component } from "react";
import "./theme/UserConfig.scss";

import SliderContainer from "./SliderContainer/SliderContainer";
import Button from "@material-ui/core/Button";

class UserConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: {
        temperature: 35,
        humidity: 60,
        light: 1000,
      }
    };
    // this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(type, event, newValue) {
    const newThreshold = {
      ...this.state.threshold,
    };
    newThreshold[type] = newValue;
    this.setState({
      threshold: newThreshold,
    });
  }
  submitHandler(){
    console.log("submit successful");
    alert('Submit successful');
  }
  resetHandler(){
    this.setState({
      threshold: {
        temperature: 35,
        humidity: 60,
        light: 1000,
      }
    });
  }
  render() {
    // const classes = useStyles();
    const { threshold } = this.state;
    const sliderContainerList = Object.keys(threshold).map((elKey) => {
      return (
        <SliderContainer
          key={elKey}
          type={elKey}
          max={elKey === "temperature" ? 50 : elKey === "humidity" ? 100 : 4095}
          value={threshold[elKey]}
          step={elKey === "temperature" ? 1 : elKey === "humidity" ? 2 : 10}
          change={this.changeHandler.bind(this, elKey)}
        />
      );
    });
    return (
      <div>
        <form onSubmit={this.submitHandler.bind(this)}>
          {sliderContainerList}
          <Button variant="contained" color="primary" type="submit">
            Apply
          </Button>
        </form>
        <div>
          <Button variant="contained" color="secondary" onClick={this.resetHandler.bind(this)}>
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default UserConfig;
