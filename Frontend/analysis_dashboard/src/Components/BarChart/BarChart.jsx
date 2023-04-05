import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({plotData}) => {
  let gradeCount = []
  let S_counter = 0;
  let A_counter = 0;
  let B_counter = 0;
  let C_counter = 0;
  let D_counter = 0;
  let E_counter = 0;
  let F_counter = 0;
  for(let i=0; i<plotData.length; i++) {
    if(plotData[i] === "S") {
      S_counter++;
    } else if(plotData[i] === "A") {
      A_counter++;
    } else if(plotData[i] === "B") {
      B_counter++;
    } else if(plotData[i] === "C") {
      C_counter++;
    } else if(plotData[i] === "D") {
      D_counter++;
    } else if(plotData[i] === "E") {
      E_counter++;
    }  else if(plotData[i] === "F") {
      F_counter++;
    }
  }
  gradeCount = [S_counter, A_counter, B_counter, C_counter, D_counter, E_counter, F_counter]
  const labels = ["S", "A", "B", "C", "D", "E", "F"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Grade Distribution",
        backgroundColor: ["#EDDA68",
        "#F7D66D",
        "#E0B96E",
        "#F7B86D",
        "#ED9D68",
        "#ED9D78",
        "rgb(255, 99, 132)"
      ],
        borderColor: "rgb(255, 99, 132)",
        data: gradeCount,
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;