import React, { useState } from "react";
import { HeaderDashboard } from "../Header/HeaderDashboard";
import { SidebarDashboard } from "../Sidebar/SidebarDashboard";
const Statistic = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [inputType, setInputType] = useState("date"); // State to track input type

  const callbackFunction = (childData) => {
    setIsShowSidebar(childData);
  };

  return (
    <div className="app-container">
      <HeaderDashboard parentCallback={callbackFunction}></HeaderDashboard>
      <div id="content-wrapper">
        <SidebarDashboard showSidebar={isShowSidebar}></SidebarDashboard>
        <div className="app-content">
          <div className="content-body">
            <div className="content-element">
              <div className="box-content bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-end mb-4">
                  <button
                    className={`btn-toggle ${inputType === "date" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} px-4 py-2 rounded-l-md focus:outline-none`}
                    onClick={() => setInputType("date")}
                  >
                    Ngày
                  </button>
                  <button
                    className={`btn-toggle ${inputType === "month" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} px-4 py-2 rounded-r-md focus:outline-none`}
                    onClick={() => setInputType("month")}
                  >
                    Tháng
                  </button>
                </div>
                <form className="form-operation space-y-6">
                  <div className="form-element">
                    <label
                      htmlFor={inputType}
                      className="max-w-24 w-1/5 block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      {inputType === "date" ? "Ngày" : "Tháng"}
                    </label>
                    <input
                      type={inputType}
                      id={inputType}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <table className="table w-full mt-4 border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">STT</th>
                        <th className="border border-gray-300 px-4 py-2">Ngày</th>
                        <th className="border border-gray-300 px-4 py-2">Tổng thu</th>
                        <th className="border border-gray-300 px-4 py-2">Tổng chi</th>
                        <th className="border border-gray-300 px-4 py-2">Lãi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">01</td>
                        <td className="border border-gray-300 px-4 py-2">01</td>
                        <td className="border border-gray-300 px-4 py-2">2 triệu</td>
                        <td className="border border-gray-300 px-4 py-2">800 nghìn</td>
                        <td className="border border-gray-300 px-4 py-2">1.2 triệu</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="form-element">
                    <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Tổng thu</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="flex justify-center gap-x-4 mt-4">
                    <div className="print form-element">
                      <button className="btn-submit px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        In thống kê
                      </button>
                    </div>
                    <div className="print form-element">
                      <button className="btn-submit px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Hiển thị biểu đồ
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
