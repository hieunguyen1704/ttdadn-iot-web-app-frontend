import React, { Component } from "react";
import "./theme/UserConfig.scss";

import SliderContainer from "./SliderContainer/SliderContainer";
// import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ButtonArea from './ButtonArea/ButtonArea';
// import Box from '@material-ui/core/Box';
class UserConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: {
        tempeThreshold: 35,
        humidThreshold: 60,
        lightThreshold: 600,
      },
      currentUserId: 1,
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
  submitHandler() {
    console.log("submit successful");
    alert("Submit successful");
  }
  resetHandler() {
    this.setState({
      threshold: {
        tempeThreshold: 35,
        humidThreshold: 60,
        lightThreshold: 600,
      },
    });
  }
  render() {
    const { threshold } = this.state;
    const sliderContainerList = Object.keys(threshold).map((elKey) => {
      return (
        <Grid item md={10} xs={12} key={elKey}>
          <SliderContainer
            type={
              elKey === "tempeThreshold"
                ? "temperature"
                : elKey === "humidThreshold"
                ? "humidity"
                : "light"
            }
            max={
              elKey === "tempeThreshold"
                ? 100
                : elKey === "humidThreshold"
                ? 100
                : 1023
            }
            value={threshold[elKey]}
            // step={elKey === "tempeThreshold" ? 1 : elKey === "humidThreshold" ? 2 : 10}
            step={1}
            change={this.changeHandler.bind(this, elKey)}
            // style={{margin: '0 auto'}}
          />
        </Grid>
      );
    });
    return (
      <Container maxWidth="lg" style={{ width: "80vw" }}>
        <h1 style={{ textAlign: "center" }}>Setting</h1>
        <form onSubmit={this.submitHandler.bind(this)}>
          <Grid container spacing={3} className="flex-center">
            {sliderContainerList}
            <Grid item md={6} xs={12}>
              <ButtonArea 
              reset = {this.resetHandler.bind(this)}
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default UserConfig;
