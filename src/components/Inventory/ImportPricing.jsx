import React, { useState } from "react";
import "./ImportPricing.scss";
import { HeaderDashboard } from "../Header/HeaderDashboard";
import { SidebarDashboard } from "../Sidebar/SidebarDashboard";
const ImportPricing = ({ pricing }) => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

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
            <div class="content-element">
              <div class="flex justify-center">
                <form class="m-5 w-full">
                  <div className="flex justify-center m-5 gap-16">
                    <label
                      for="billId"
                      className="max-w-24 w-1/5 block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Mã phiếu
                    </label>
                    <input
                      id="billId"
                      type="text"
                      disabled
                      className="w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-center m-5 gap-16">
                    <label
                      for="inputPerson"
                      className="max-w-24 w-1/5 block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Người nhập
                    </label>
                    <input
                      id="inputPerson"
                      type="text"
                      disabled
                      className="w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-center m-5 gap-16">
                    <label
                      for="date"
                      className="max-w-24 w-1/5 block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Ngày/tháng/năm
                    </label>
                    <input
                      id="date"
                      type="text"
                      disabled
                      className="w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-center m-5 gap-16">
                    <label
                      for="date"
                      className="max-w-24 w-1/5 block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Hàng hóa
                    </label>
                    <select
                      id="countries"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Chọn hàng hóa</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>

                  <div className="relative">
                    <table className="table w-full text-center">
                      <thead>
                        <tr>
                          <th className="p">STT</th>
                          <th>Mã hàng</th>
                          <th class="emp-name">Tên hàng</th>
                          <th>Size</th>
                          <th>Đơn giá</th>
                          <th>Màu sắc</th>
                          <th>Số lượng</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>MH001</td>
                          <td>Áo T-Shirt</td>
                          <td>XL</td>
                          <td>450000</td>
                          <td>Trắng</td>
                          <td>
                            <input
                              type="text"
                              id="small-input-6"
                              className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                            />
                          </td>
                          <td>
                            <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">
                              Hủy
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="flex justify-center gap-x-4 mt-4">
                    <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">
                      Xác nhận
                    </button>
                    <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">
                      Xóa toàn bộ
                    </button>
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

export default ImportPricing;
