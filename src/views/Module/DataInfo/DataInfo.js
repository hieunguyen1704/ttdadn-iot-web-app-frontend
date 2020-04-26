import React, { useEffect } from "react";
import "./theme/DataInfo.scss";
import { Chart } from "react-charts";
import Axios from "axios";
import { config } from "../../../config";
const data = [
  {
    label: "Series 1",
    data: [
      [0, 1],
      [1, 2],
      [2, 4],
      [3, 2],
      [4, 7],
    ],
  },
  {
    label: "Series 2",
    data: [
      [0, 3],
      [1, 1],
      [2, 5],
      [3, 6],
      [4, 4],
    ],
  },
];

const axes = [
  { primary: true, type: "linear", position: "bottom" },
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
        <Chart data={data} axes={axes} tooltip />
      </div>
    </div>
  );
};

export default DataInfo;
