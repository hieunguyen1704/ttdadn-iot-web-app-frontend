import React, { Component } from "react";
import "./theme/UserConfig.scss";
import SliderContainer from "./SliderContainer/SliderContainer";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ButtonArea from "./ButtonArea/ButtonArea";
import HistoryConfig from "./HistoryConfig/HistoryConfig";
import Axios from "axios";
import { config } from "../../../config";
import { connect } from "react-redux";
import CurrentSetting from "./CurrentSetting/CurrentSetting";
import Loading from "./Loading/Loading";
import DeleteAlert from './DeleteAlert/DeleteAlert';
class UserConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: {
        tempeThreshold: 35,
        humidThreshold: 60,
        lightThreshold: 600,
      },
      historyConfig: [],
      currentConfig: {},
      displayAlert: false,
      deleteConfigIndex: undefined
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
    event.preventDefault();
    const createConfigURL = config.dbURl + config.api.getConfig;
    let { threshold } = this.state;
    let sendData = { ...threshold };
    Axios.post(createConfigURL, sendData)
      .then((response) => {
        if (response.data.data === "successful") {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
    const { historyConfig} = this.state;
    let newHistoryConfig = [...historyConfig];
    const deletedConfig = newHistoryConfig.splice(configIndex, 1);
    const deletedConfigURL =
      config.dbURl + config.api.deleteConfig + deletedConfig[0].id;
    Axios.get(deletedConfigURL)
      .then((response) => {
        if (response.data.data === "deleted successful") {
          this.setState({
            historyConfig: newHistoryConfig,
            displayAlert: false,
            deleteConfigIndex: undefined
          });
          // if(currentConfig){
          //   if(deletedConfig[0].id === currentConfig.id){ 
          //       this.setState({
          //         currentConfig: {}
          //       });
          //   }
          // }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  checkedHistoryHandler(configIndex) {
    const { threshold, historyConfig } = this.state;
    let newThreshold = { ...threshold };
    newThreshold.humidThreshold = historyConfig[configIndex].humidThreshold;
    newThreshold.lightThreshold = historyConfig[configIndex].lightThreshold;
    newThreshold.tempeThreshold = historyConfig[configIndex].tempeThreshold;
    this.setState({
      threshold: newThreshold,
    });
  }
  async ConfigInfo() {
    const configOfUserURL =
      config.dbURl + config.api.getConfig;
    try {
      const response = await Axios.get(configOfUserURL);
      if (response.data.data.length !== this.state.historyConfig.length) {
        this.setState({
          historyConfig: response.data.data,
          // currentConfig:
          //   response.data.data.length > 0
          //     ? response.data.data[response.data.data.length - 1] //get last config
          //     : {},
        });
      }
      if(response.data.data.length > 0){
        if(response.data.data[response.data.data.length - 1].id !== this.state.currentConfig.id){
          this.setState({
            currentConfig: response.data.data[response.data.data.length - 1]
          });
        }
      }else{
        if(this.state.currentConfig){
          this.setState({
            currentConfig: {}
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  componentDidMount() {
    if (this.props.userId) {
      this.ConfigInfo();
    }
  }
  componentDidUpdate() {
    if (this.props.userId) {
      this.ConfigInfo();
    }
  }
  // displayAlert(){
  //   this.setState({
  //     displayAlert: true
  //   });
   // }
  verifyDeleteHandler(configIndex){
    // const {isDelete} = this.state;
    this.setState({
      displayAlert:true,
      deleteConfigIndex: configIndex
    });
    // if(isDelete){
    //   console.log("Delete");
    //   this.deletedHistoryHandler(configIndex);
    // }
    // else{
    //   this.setState({
    //     displayAlert:false
    //   });
    // }
  }
  agreeDeleteHandler(){
    console.log(this.state.deleteConfigIndex);
    this.deletedHistoryHandler(this.state.deleteConfigIndex)
  }
  disagreeDeleteHandler(){
    this.setState({
      displayAlert: false,
      deleteConfigIndex: undefined
    });
  }
  render() {
    const { threshold, historyConfig,displayAlert } = this.state;
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
    if (this.props.userId) {
      return (
        <Container maxWidth="lg" style={{ width: "80vw"}}>
          <CurrentSetting currentConfig={this.state.currentConfig} />
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
          {displayAlert ? <DeleteAlert agreed={this.agreeDeleteHandler.bind(this)} disagreed={this.disagreeDeleteHandler.bind(this)}/> : null}
          <HistoryConfig
            history={historyConfig}
            verifyDelete= {this.verifyDeleteHandler.bind(this)}
            deleted={this.deletedHistoryHandler.bind(this)}
            checked={this.checkedHistoryHandler.bind(this)}
          />
        </Container>
      );
    } else {
      if (this.props.isAuthenticated === false) {
        return (
          <Container maxWidth="lg" style={{ width: "80vw" }}>
            <Grid container spacing={3} className="flex-center">
              <Grid item md={10} xs={12}>
                <h1 style={{ textAlign: "center" }}>
                  Please log in before setting config
                </h1>
              </Grid>
            </Grid>
          </Container>
        );
      }
      return (
        <Container maxWidth="lg" style={{ width: "80vw" }}>
          <Grid container spacing={3} className="flex-center">
            <Grid item md={10} xs={12}>
              <Loading />
            </Grid>
          </Grid>
        </Container>
      );
    }
  }
}
function mapStateToProps(state) {
  // console.log(state);
  if (state.auth.isAuthenticated) {
    return {
      userId: state.auth.user.id,
      isAuthenticated: state.auth.isAuthenticated,
    };
  } else {
    return {
      userId: null,
      isAuthenticated: state.auth.isAuthenticated,
    };
  }
}
export default connect(mapStateToProps)(UserConfig);
