import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieChart = ({plotData}) => {
    let passFailData = []
    let failCounter = 0;
    for(let i=0; i<plotData.length; i++) {
        if(plotData[i] === "F") {
            failCounter++;
        }
    }
    let passCounter = plotData.length - failCounter;
    passFailData = [passCounter, failCounter]
    const labels = ["Pass", "Fail"];
    const data = {
    labels: labels,
    datasets: [
        {
        label: "Pass Fail Distribution",
        backgroundColor: ["rgb(20, 255, 20)",
        "rgb(255, 0, 0)"
        ],
        borderColor: "rgb(0,0,0)",
        data: passFailData,
        },
    ],
    };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};
export default PieChart;