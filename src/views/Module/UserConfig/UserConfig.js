import React, { Component } from "react";
import "./theme/UserConfig.scss";

import SliderContainer from "./SliderContainer/SliderContainer";
import Button from "@material-ui/core/Button";
class UserConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: {
        tempeThreshold: 35,
        humidThreshold: 60,
        lightThreshold: 1000
      },
      currentUserId: 1
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
        tempeThreshold: 35,
        humidThreshold: 60,
        lightThreshold: 1000
      }
    });
  }
  render() {
    const { threshold } = this.state;
    const sliderContainerList = Object.keys(threshold).map((elKey) => {
      return (
        <SliderContainer
          key={elKey}
          type={elKey ==="tempeThreshold" ? "temperature" : elKey === "humidThreshold" ? "humidity": "light"}
          max={elKey === "tempeThreshold" ? 50 : elKey === "humidThreshold" ? 100 : 4095}
          value={threshold[elKey]}
          step={elKey === "tempeThreshold" ? 1 : elKey === "humidThreshold" ? 2 : 10}
          change={this.changeHandler.bind(this, elKey)}
        />
      );
    });
    return (
      <div>
        <h1 style={{textAlign:"center"}}>Setting</h1>
        <form onSubmit={this.submitHandler.bind(this)}>
          {sliderContainerList}
          <Button variant="contained" color="primary" type="submit">
            Apply
          </Button>
          <Button variant="contained" color="secondary" onClick={this.resetHandler.bind(this)}>
            Reset
          </Button>
        </form>
      </div>
    );
  }
}

export default UserConfig;
