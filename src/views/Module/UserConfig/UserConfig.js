import React, { Component } from "react";
import "./theme/UserConfig.scss";
import SliderContainer from "./SliderContainer/SliderContainer";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ButtonArea from "./ButtonArea/ButtonArea";
import HistoryConfig from "./HistoryConfig/HistoryConfig";
import Axios from "axios";
import {config} from "../../../config";
class UserConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: {
        tempeThreshold: 35,
        humidThreshold: 60,
        lightThreshold: 600,
      },
      currentUserId: 38,
      historyConfig: [],
    };
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
    const createConfigURL =  config.dbURl + config.api.getConfig;
    let { threshold ,currentUserId} = this.state;
    let sendData = {...threshold};
    sendData.userId = currentUserId;
    Axios.post(createConfigURL,sendData).then(response=>{
      if(response.data.data === "successful"){
        window.location.reload();
      }
    })
    .catch(error=>{
      console.error(error)
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
    const deletedConfig = newHistoryConfig.splice(configIndex, 1);
    const deletedConfigURL = config.dbURl + config.api.deleteConfig + deletedConfig[0].id;
    Axios.get(deletedConfigURL).then(response=>{
      if(response.data.data === "deleted successful"){
        this.setState({
          historyConfig: newHistoryConfig
        })
      }
    })
    .catch(error=>{
      console.error(error);
    })
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
  async ConfigInfo (){
    const {currentUserId} = this.state;
    const configOfUserURL =  config.dbURl + config.api.getConfig + currentUserId.toString();
    try {
      const response = await Axios.get(configOfUserURL);
      this.setState({
        historyConfig: response.data.data
      });

    } catch (error) {
      console.error(error);
    }
  }
  componentDidMount(){
    this.ConfigInfo();
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
