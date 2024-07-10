import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import { HeaderDashboard } from "../Header/HeaderDashboard";
import { SidebarDashboard } from "../Sidebar/SidebarDashboard";

const StatisticByChart = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const callbackFunction = (childData) => {
    setIsShowSidebar(childData);
  };

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Income",
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="app-container">
      <HeaderDashboard parentCallback={callbackFunction}></HeaderDashboard>
      <div id="content-wrapper">
        <SidebarDashboard showSidebar={isShowSidebar}></SidebarDashboard>
        <div className="app-content">
          <div className="content-body">
            <div className="content-element">
              <canvas id="myChart" ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticByChart;
