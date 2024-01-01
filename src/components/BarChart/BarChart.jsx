import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale, // x axis
  LinearScale, //y axis
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import { titleCase, lowerCase } from "../../utils/dataFormatter";
import { fetchDataTable } from "../../services/agricultureAPI";

export const BarChart = ({
  chartData,
  xaxis,
  yaxis,
  chartTitle,
  chartColor,
  setFilters,
  filters,
}) => {
  const chartRef = useRef();
  const labels = [];
  const axesMap = {};
  if (chartData && chartData.length > 0) {
    for (let item of chartData) {
      let xAxisValue = titleCase(item[xaxis]);
      labels.push(xAxisValue);
      if (!axesMap.xAxisValue) {
        axesMap[xAxisValue] = titleCase(item[yaxis]);
      }
    }
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels,
    datasets: [
      {
        label: chartTitle,
        data: labels.map((key) => axesMap[key]),
        backgroundColor: chartColor,
      },
    ],
  };

  const onClick = async (event) => {
    const clickedPortionData = getElementsAtEvent(chartRef.current, event);
    const currentFilter = { ...filters };
    if (clickedPortionData && clickedPortionData.length > 0) {
      const filterKey = lowerCase(xaxis);
      const filterValue = lowerCase(labels[clickedPortionData[0].index]);
      if (!currentFilter["secondaryFilters"])
        currentFilter["secondaryFilters"] = {};
      currentFilter["secondaryFilters"][filterKey] = filterValue;
      setFilters(currentFilter);
    }
  };

  return <Bar ref={chartRef} data={data} onClick={onClick} />;
};
