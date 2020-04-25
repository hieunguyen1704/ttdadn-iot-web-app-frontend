import React from "react";
import "./theme/DataInfo.scss";
import { Chart } from "react-charts";

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
const DataInfo = () => {
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
