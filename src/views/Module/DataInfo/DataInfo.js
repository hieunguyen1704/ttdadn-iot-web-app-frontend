import React, { useState, useEffect } from "react";
import "./theme/DataInfo.scss";

import axios from "axios";
import { config } from "../../../config";
import ControlledOpenSelect from "./Select/Select";
import CanvasJSReact from "../../../assets/canvasjs.react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Loading from "../UserConfig/Loading/Loading";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const DataInfo = (props) => {
  const [tempData, setTempData] = useState([]);
  const [humidData, setHumidData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [time, setTime] = useState("10"); //min
  const [loading, setLoading] = useState(true);

  const timeChangeHandler = (time) => {
    setTime(time);
  };
  useEffect(() => {
    let mounted = true;
    let dataUrl = config.dbURl + config.api.dataWithTime + time;
    axios
      .get(dataUrl)
      .then((response) => {
        if (mounted) {
          let diff = 1;
          if (response.data.data.length > 20) {
            diff = Math.round(response.data.data.length / 20);
          }
          const lengthRes = response.data.data.length;
          var tempArr = [];
          var humidArr = [];
          var lightArr = [];
          for (var i = 0; i < lengthRes; i = i + diff) {
            tempArr.push({
              x: new Date(response.data.data[i].createdAt),
              y: parseInt(response.data.data[i].temperature),
            });
            humidArr.push({
              x: new Date(response.data.data[i].createdAt),
              y: parseInt(response.data.data[i].humid),
            });
            lightArr.push({
              x: new Date(response.data.data[i].createdAt),
              y: parseInt(response.data.data[i].light),
            });
          }
          //get last data
          if (i > lengthRes) {
            tempArr.push({
              x: new Date(response.data.data[lengthRes - 1].createdAt),
              y: parseInt(response.data.data[lengthRes - 1].temperature),
            });
            humidArr.push({
              x: new Date(response.data.data[lengthRes - 1].createdAt),
              y: parseInt(response.data.data[lengthRes - 1].humid),
            });
            lightArr.push({
              x: new Date(response.data.data[lengthRes - 1].createdAt),
              y: parseInt(response.data.data[lengthRes - 1].light),
            });
          }
          setTempData(tempArr);
          setHumidData(humidArr);
          setLightData(lightArr);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    return () => (mounted = false);
  }, [time]);

  let option1 = {
    animationEnabled: true,
    title: {
      text: "Temperature & Humidity",
    },
    axisX: {
      valueFormatString: "hh:mmTT",
    },
    axisY: {
      title: "Value",
      includeZero: false,
    },
    data: [
      {
        name: "Temp(°C)",
        showInLegend: true,
        yValueFormatString: "#°C",
        xValueFormatString: "YYYY/MM/DD hh:mm:ss TT",
        type: "line",
        dataPoints: tempData,
      },
      {
        name: "Humid(%)",
        showInLegend: true,
        yValueFormatString: "#'%'",
        xValueFormatString: "YYYY/MM/DD hh:mm:ss TT",
        type: "line",
        dataPoints: humidData,
      },
    ],
  };

  let option2 = {
    animationEnabled: true,
    title: {
      text: "Light",
    },
    axisX: {
      valueFormatString: "hh:mmTT",
    },
    axisY: {
      title: "Value",
      includeZero: false,
    },
    data: [
      {
        name: "Light",
        showInLegend: true,
        yValueFormatString: "",
        xValueFormatString: "YYYY/MM/DD hh:mm:ss TT",
        type: "line",
        dataPoints: lightData,
      },
    ],
  };
  const result = props.isAuthenticated ? (
    loading ? (
      <Loading />
    ) : (
      <Grid
        container
        spacing={3}
        style={{ width: "80vw", display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={12}>
          <ControlledOpenSelect changed={timeChangeHandler} />
        </Grid>
        <Grid item md={6} xs={12}>
          <CanvasJSChart options={option1} className="chart" />
        </Grid>
        <Grid item md={6} xs={12}>
          <CanvasJSChart options={option2} className="chart" />
        </Grid>
      </Grid>
    )
  ) : (
    <Grid
      container
      spacing={3}
      style={{ width: "80vw", display: "flex", justifyContent: "center" }}
    >
      <Grid item md={10} xs={12}>
        {loading ? (
          <Loading />
        ) : (
          <h1 style={{ textAlign: "center" }}>
            Please log in before viewing data
          </h1>
        )}
      </Grid>
    </Grid>
  );
  return result;
};
const mapStateToProps = (state) => {
  // console.log(state.auth);
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(DataInfo);
