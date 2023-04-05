import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({plotData}) => {
  let gradeCount = []
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;
  let six = 0;
  let seven = 0;
  let eight = 0;
  let nine = 0;
  let ten = 0;
  for(let i=0; i<plotData.length; i++) {
  if(plotData[i] <= 10)
            one++;
  else if(plotData[i] > 10 && plotData[i] <= 20)
            two++;
    else if(plotData[i] > 20 && plotData[i] <= 30)
            three++;
    else if(plotData[i] > 30 && plotData[i] <= 40)
            four++;
    else if(plotData[i] > 40 && plotData[i] <= 50)
            five++;
    else if(plotData[i] > 50 && plotData[i] <= 60)
            six++;
    else if(plotData[i] > 60 && plotData[i] <= 70)
            seven++;
    else if(plotData[i] > 70 && plotData[i] <= 80)
            eight++;
    else if(plotData[i] > 80 && plotData[i] <= 90)
            nine++;
    else if(plotData[i] > 90 && plotData[i] <= 100)
            ten++;
  }
  gradeCount = [one, two, three, four, five, six, seven, eight, nine, ten]
  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9"," 10"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Star Rating Distribution",
        backgroundColor: ["#EDDA68",
        "#F7D66D",
        "#E0B96E",
        "#F7B86D",
        "#ED9D68",
        "#ED9D78",
        "rgb(255, 99, 132)",
        "rgb(255, 99, 150)",
        "rgb(255, 99, 200)",
        "rgb(255, 99, 255)"
      ],
        borderColor: "rgb(255, 120, 132)",
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