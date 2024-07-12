import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { HeaderDashboard } from "../Header/HeaderDashboard";
import { SidebarDashboard } from "../Sidebar/SidebarDashboard";
import { getDailySalesRevenueForMonth } from "../../services/bill/bill-service";

const StatisticByChart = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [revenueList, setRevenueList] = useState([]);
  const [time, setTime] = useState("");
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [noData, setNoData] = useState(false); // State to track if there is no data

  useEffect(() => {
    if (time) {
      fetchData(time);
    }
  }, [time]);

  const fetchData = async (time) => {
    try {
      const list = await getDailySalesRevenueForMonth(time);

      // Check if list is empty or null
      if (!list || list.length === 0) {
        setRevenueList([]);
        setNoData(true); // Set noData state to true
        return;
      }

      const filledData = fillMissingDays(list, time);
      setRevenueList(filledData);
      setNoData(false); // Set noData state to false when there is data
      updateChart(filledData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const fillMissingDays = (data, time) => {
    const [year, month] = time.split("-");
    const daysInMonth = new Date(year, month, 0).getDate();
    const completeData = Array.from({ length: daysInMonth }, (_, index) => ({
      day: index + 1,
      revenue: 0,
    }));

    data.forEach((item) => {
      completeData[item.day - 1].revenue = item.revenue;
    });

    return completeData;
  };

  const updateChart = (data) => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const labels = data.map((item) => item.day);
    const revenues = data.map((item) => item.revenue);

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Daily Revenue",
            data: revenues,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Disable the aspect ratio to control size with CSS
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              autoSkip: false, // Ensure all labels are displayed
              maxRotation: 90,
              minRotation: 90,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
      <div className="app-container">
        <HeaderDashboard parentCallback={setIsShowSidebar} />
        <div id="content-wrapper">
          <SidebarDashboard showSidebar={isShowSidebar} />
          <div className="app-content">
            <div className="content-body">
              <div className="content-element box-content bg-white my-1 w-0.5 rounded-lg shadow-md">
                <div className="flex justify-center mb-6 px-2">
                  <input
                      type="month"
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                      onChange={handleTimeChange}
                      required
                  />
                </div>
                <div
                    className="chart-container flex justify-center"
                    style={{ position: "relative", height: "70vh", width: "70vw" }}
                >
                  {noData ? (
                      <p className="text-center text-gray-500">Không có dữ liệu cho thời gian đã chọn</p>
                  ) : (
                      <canvas id="myChart" ref={chartRef} style={{ height: "100%", width: "100%" }}></canvas>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default StatisticByChart;
