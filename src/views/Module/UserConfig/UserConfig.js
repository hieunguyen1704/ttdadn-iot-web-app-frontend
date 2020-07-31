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
import DeleteAlert from "./DeleteAlert/DeleteAlert";
import Switch from "./Switch/Switch";
// import MotorState from "./MotorState/MotorState";
import FormDialog from "./Dialog/SetName";
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
      deleteConfigIndex: undefined,
      isTurn: null,
      displayFormDialog: false,
      sendData: {},
      isDisplaySetting: false,
    };
    this.timeInterval = 0;
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
    // display set name form
    this.setState({
      displayFormDialog: true,
    });
    // const createConfigURL = config.dbURl + config.api.getConfig;
    let { threshold } = this.state;
    let sendData = { ...threshold, name: "default" };

    this.setState({
      sendData,
    });
  }
  submitSuccessHandler() {
    // console.log("submit succeeded");
    this.setState({
      historyConfig: [],
      displayAlert: false,
      deleteConfigIndex: undefined,
      isTurn: null,
      displayFormDialog: false,
      sendData: {},
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
  // @deletedIndex is the id of config in db
  deletedHistoryHandler(deletedId) {
    const { historyConfig } = this.state;
    let newHistoryConfig = [...historyConfig];
    let configIndex = 0;
    for (let i = 0; i < historyConfig.length; i++) {
      if (historyConfig[i].id === deletedId) {
        configIndex = i;
        break;
      }
    }
    // delete config
    newHistoryConfig.splice(configIndex, 1);
    const deletedConfigURL = config.dbURl + config.api.deleteConfig + deletedId;
    Axios.get(deletedConfigURL)
      .then((response) => {
        if (response.data.data === "deleted successful") {
          this.setState({
            historyConfig: newHistoryConfig,
            displayAlert: false,
            deleteConfigIndex: undefined,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  checkedHistoryHandler(checkedId, name) {
    const { historyConfig } = this.state;
    let configIndex = 0;
    for (let i = 0; i < historyConfig.length; i++) {
      if (historyConfig[i].id === checkedId) {
        configIndex = i;
        break;
      }
    }
    const humidThreshold = historyConfig[configIndex].humidThreshold;
    const tempeThreshold = historyConfig[configIndex].tempeThreshold;
    const lightThreshold = historyConfig[configIndex].lightThreshold;

    let sendedConfig = { humidThreshold, tempeThreshold, lightThreshold, name };
    const createConfigURL = config.dbURl + config.api.getConfig;
    const deletedConfigURL = config.dbURl + config.api.deleteConfig + checkedId;
    // Create new config with checked config
    Axios.post(createConfigURL, sendedConfig)
      .then((response) => {
        if (response.data.data === "successful") {
          // delete the old checked config
          Axios.get(deletedConfigURL)
            .then((response) => {
              if (response.data.data === "deleted successful") {
                this.setState({
                  currentConfig: {
                    humidThreshold,
                    tempeThreshold,
                    lightThreshold,
                  },
                  historyConfig: [],
                });
                // window.location.reload();
                // this.ConfigInfo();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async ConfigInfo() {
    const configOfUserURL = config.dbURl + config.api.getConfig;
    try {
      const response = await Axios.get(configOfUserURL);
      if (response.data.data.length !== this.state.historyConfig.length) {
        this.setState({
          historyConfig: response.data.data,
        });
      }
      //get last config of user
      if (response.data.data.length > 0) {
        if (
          response.data.data[response.data.data.length - 1].id !==
          this.state.currentConfig.id
        ) {
          this.setState({
            currentConfig: response.data.data[response.data.data.length - 1],
          });
        }
      } else {
        if (this.state.currentConfig) {
          this.setState({
            currentConfig: {},
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  // get motor state when turn on auto mode
  getAutoMotorState() {
    if (this.props.isAuto) {
      let motorUrl = config.dbURl + config.api.motorState;
      Axios.get(motorUrl)
        .then((response) => {
          // console.log("Get Motor State:  " + response.data.data);
          if (response.data.data !== this.state.isTurn) {
            // console.log("Get Motor State:  " + response.data.data);
            this.setState({
              isTurn: response.data.data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  componentDidMount() {
    if (this.props.userId) {
      this.ConfigInfo();
      // this.getAutoMotorState();
      // setInterval(()=>{
      //   this.getAutoMotorState();
      // },5000);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId) {
      this.ConfigInfo();
      if (
        prevState.currentConfig.humidThreshold !==
          this.state.currentConfig.humidThreshold ||
        prevState.currentConfig.tempeThreshold !==
          this.state.currentConfig.tempeThreshold ||
        prevState.currentConfig.lightThreshold !==
          this.state.currentConfig.lightThreshold
      ) {
        this.getAutoMotorState();
        // console.log(prevState);
        this.timeInterval = setInterval(() => {
          this.getAutoMotorState();
        }, 5000);
      }
    }
  }
  componentWillUnmount() {
    // console.log("UserConfig WillUnmount");
    clearInterval(this.timeInterval);
  }
  // @deletedIndex is the id of config in db
  verifyDeleteHandler(deletedId) {
    this.setState({
      displayAlert: true,
      deleteConfigIndex: deletedId,
    });
  }
  agreeDeleteHandler() {
    this.deletedHistoryHandler(this.state.deleteConfigIndex);
  }
  disagreeDeleteHandler() {
    this.setState({
      displayAlert: false,
      deleteConfigIndex: undefined,
    });
  }
  getTurnOnState(check) {
    this.setState({
      isTurn: check,
    });
  }
  changeDisplaySetting() {
    this.setState({
      isDisplaySetting: !this.state.isDisplaySetting,
    });
  }

  render() {
    const {
      threshold,
      historyConfig,
      displayAlert,
      displayFormDialog,
      sendData,
    } = this.state;
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
        <Container maxWidth="lg" style={{ width: "80vw" }}>
          {this.props.isAuto && this.props.isAdmin ? (
            <div>
              {/* <MotorState isOn={this.state.isTurn} /> */}
              <CurrentSetting
                currentConfig={this.state.currentConfig}
                isOn={this.state.isTurn}
                changeDisplaySetting={this.changeDisplaySetting.bind(this)}
              />
              <form onSubmit={this.submitHandler.bind(this)}>
                <Grid container spacing={3} className="flex-center">
                  {this.state.isDisplaySetting && (
                    <Grid item md={10} xs={12}>
                      <h4 style={{ marginTop: 15 }}>New Config</h4>
                    </Grid>
                  )}

                  {this.state.isDisplaySetting && sliderContainerList}
                  {/* {sliderContainerList} */}
                  {this.state.isDisplaySetting && (
                    <Grid item md={6} xs={12}>
                      <ButtonArea reset={this.resetHandler.bind(this)} />
                    </Grid>
                  )}
                </Grid>
              </form>
              {displayAlert ? (
                <DeleteAlert
                  agreed={this.agreeDeleteHandler.bind(this)}
                  disagreed={this.disagreeDeleteHandler.bind(this)}
                />
              ) : null}
              {/* display set name form  */}
              {displayFormDialog && (
                <FormDialog
                  sendData={sendData}
                  succeeded={this.submitSuccessHandler.bind(this)}
                />
              )}
              <HistoryConfig
                history={historyConfig}
                verifyDelete={this.verifyDeleteHandler.bind(this)}
                deleted={this.deletedHistoryHandler.bind(this)}
                checked={this.checkedHistoryHandler.bind(this)}
              />
            </div>
          ) : this.props.isAdmin ? (
            <div>
              {/* <MotorState isOn={this.state.isTurn} /> */}
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <Grid item>
                  <h3>Manual Setting:</h3>
                </Grid>
                <Grid item>
                  <Switch
                    turnOn={this.getTurnOnState.bind(this)}
                    isTurn={this.state.isTurn}
                  />
                </Grid>
              </Grid>
            </div>
          ) : (
            <Grid container spacing={3} className="flex-center">
              <Grid item md={10} xs={12}>
                <h3 style={{ textAlign: "center" }}>
                  Please use the administrator rights to login before setting
                </h3>
              </Grid>
            </Grid>
          )}
        </Container>
      );
    } else {
      return (
        <Container maxWidth="lg" style={{ width: "80vw" }}>
          <Grid container spacing={3} className="flex-center">
            <Grid item md={10} xs={12}>
              {this.props.isAuthenticated === false ? (
                <h3 style={{ textAlign: "center" }}>
                  Please log in before setting config
                </h3>
              ) : (
                <Loading />
              )}
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
      isAuto: state.auth.user.isAuto,
      isAdmin: state.auth.user.isAdmin,
    };
  } else {
    return {
      userId: null,
      isAuthenticated: state.auth.isAuthenticated,
    };
  }
}
export default connect(mapStateToProps)(UserConfig);
