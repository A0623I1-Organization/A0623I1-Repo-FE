import React, { useState } from "react";
import "./ImportPricing.scss";
import { HeaderDashboard } from "../Header/HeaderDashboard";
import { SidebarDashboard } from "../Sidebar/SidebarDashboard";
const ImportPricing = () => {
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
              <div class="box-content flex justify-center">
                <form class="m-5">
                  <div className="flex justify-center m-5 gap-16">
                    <label for="billId" className="max-w-24 w-1/5">
                      Nhập liệu
                    </label>
                    <input id="billId" type="text" className="w-4/5" />
                  </div>
                  <div className="flex justify-center m-5 gap-16">
                    <label for="inputPerson" className="max-w-24 w-1/5">
                      Người nhập
                    </label>
                    <input id="inputPerson" type="text" className="w-4/5" />
                  </div>
                  <div className="flex justify-center m-5 gap-16">
                    <label for="date" className="max-w-24 w-1/5">
                      Ngày/tháng/năm
                    </label>
                    <input id="date" type="text" className="w-4/5" />
                  </div>

                  <div className="relative overflow-x-auto">
                    <table className="">
                      <thead>
                        <tr>
                          <th className="p">STT</th>
                          <th>Mã hàng</th>
                          <th class="emp-name">Tên</th>
                          <th>Số lượng</th>
                          <th>Size</th>
                          <th>Đơn giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input type="text" />
                          </td>
                          <td>
                            <input type="text" />
                          </td>
                          <td>
                            <input type="text" />
                          </td>
                          <td>
                            <input type="text" />
                          </td>
                          <td>
                            <input type="text" />
                          </td>
                          <td>
                            <input type="text" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="flex justify-center gap-x-4 mt-4">
                    <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">Xác nhận</button>
                    <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">Hủy</button>
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
