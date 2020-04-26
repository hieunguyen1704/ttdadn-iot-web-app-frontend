import React, { Component } from "react";
import "./theme/UserConfig.scss";
import SliderContainer from "./SliderContainer/SliderContainer";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ButtonArea from "./ButtonArea/ButtonArea";
import HistoryConfig from "./HistoryConfig/HistoryConfig";
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
      historyConfig: [
        {
          humidThreshold: 66,
          tempeThreshold: 20,
          lightThreshold: 300,
          createdAt: "2020-04-24T19:22:40.419Z",
        },
        {
          humidThreshold: 50,
          tempeThreshold: 22,
          lightThreshold: 500,
          createdAt: "2020-04-24T19:22:40.419Z",
        },
      ],
    };
  }
  getCurrentTime() {
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
    return date;
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
  submitHandler(event) {
    console.log("submit successful");
    let { threshold, historyConfig } = this.state;
    let newHistoryConfig = [...historyConfig];
    let newConfig = {
      humidThreshold: threshold.humidThreshold,
      tempeThreshold: threshold.tempeThreshold,
      lightThreshold: threshold.lightThreshold,
      createdAt: this.getCurrentTime(),
    };
    newHistoryConfig.push(newConfig);
    this.setState({
      historyConfig: newHistoryConfig,
    });
    event.preventDefault();
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
  deletedHistoryHandler(configIndex) {
    const { historyConfig } = this.state;
    let newHistoryConfig = [...historyConfig];
    newHistoryConfig.splice(configIndex, 1);
    this.setState({
      historyConfig: newHistoryConfig,
    });
  }
  checkedHistoryHandler(configIndex){
    const { threshold,historyConfig } = this.state;
    let newThreshold = {...threshold};
    newThreshold.humidThreshold = historyConfig[configIndex].humidThreshold;
    newThreshold.lightThreshold = historyConfig[configIndex].lightThreshold;
    newThreshold.tempeThreshold = historyConfig[configIndex].tempeThreshold;
    this.setState({
      threshold: newThreshold
    });
  }
  render() {
    const { threshold, historyConfig } = this.state;
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
            step={1}
            change={this.changeHandler.bind(this, elKey)}
          />
        </Grid>
      );
    });
    return (
      <Container maxWidth="lg" style={{ width: "80vw" }}>
        <form onSubmit={this.submitHandler.bind(this)}>
          <Grid container spacing={3} className="flex-center">
            <Grid item md={10} xs={12}>
              <h1>Setting</h1>
            </Grid>
            {sliderContainerList}
            <Grid item md={6} xs={12}>
              <ButtonArea reset={this.resetHandler.bind(this)} />
            </Grid>
          </Grid>
        </form>
        <HistoryConfig
          history={historyConfig}
          deleted={this.deletedHistoryHandler.bind(this)}
          checked={this.checkedHistoryHandler.bind(this)}
        />
      </Container>
    );
  }
}
export default UserConfig;
