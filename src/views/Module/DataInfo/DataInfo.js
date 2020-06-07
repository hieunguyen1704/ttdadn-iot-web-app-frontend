import React, { useEffect } from "react";
import "./theme/DataInfo.scss";
import { Chart } from "react-charts";
import Axios from "axios";
import { config } from "../../../config";
const data = [
  {
    label: "Series 1",
    data: [
      [new Date("2020-04-01T01:10:00"), 1],
      [new Date("2020-04-01T01:15:00"), 2],
      [new Date("2020-04-01T01:20:00"), 4],
      [new Date("2020-04-01T01:35:00"), 2],
      [new Date("2020-04-01T01:30:00"), 7],
    ],
  },
  {
    label: "Series 2",
    data: [
      [new Date("2020-04-01T01:10:00"), 3],
      [new Date("2020-04-01T01:15:00"), 1],
      [new Date("2020-04-01T01:20:00"), 5],
      [new Date("2020-04-01T01:25:00"), 6],
      [new Date("2020-04-01T01:30:00"), 4],
    ],
  },
];

const options = {
  xAxes: [
    {
      type: "time",
      time: {
        unit: "month",
      },
    },
  ],
};

const axes = [
  { primary: true, type: "time", position: "bottom" },
  { type: "linear", position: "left" },
];

const dataUrl = config.dbURl + config.api.data;
const DataInfo = () => {
  const getDataInfo = async () => {
    try {
      console.log(dataUrl);
      const response = await Axios.get(dataUrl);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDataInfo();
  }, []);
  return (
    <div className="data-info-component">
      <div
        className="data-chart"
        style={{
          width: "400px",
          height: "300px",
        }}
      >
        <Chart data={data} axes={axes} options={options} tooltip />
      </div>
    </div>
  );
};

export default DataInfo;
