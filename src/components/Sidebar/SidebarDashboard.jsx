import "./sidebarDashboard.scss";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as authenticationService from "../../services/auth/AuthenticationService";

export function SidebarDashboard(props) {
    const [sidebarActive, setSidebarActive] = useState(props.showSidebar);
    const [showDropdown, setShowDropdown] = useState("");
    const isAdmin = authenticationService.isAdmin();
    const isSalesMan = authenticationService.isSalesMan();
    const isWarehouse = authenticationService.isWarehouse();
    const isStoreManager = authenticationService.isStoreManager();

    useEffect(() => {
        setSidebarActive(props.showSidebar);
    }, [props.showSidebar]);

    const handleToggleDropdown = (sidebarName) => {
        setShowDropdown(showDropdown === sidebarName ? "" : sidebarName);
    }

    return (
        <aside className={sidebarActive? "sidebar appear" : "sidebar"}>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <a className="show-dropdown">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="feather feather-dashboard"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                            <path
                                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                        </svg>
                        <span>Trang quản lý</span>
                    </a>
                </li>
                {(isSalesMan || isAdmin) && <li className="sidebar-list-item paste-button active" >
                    <a className="show-dropdown" onClick={()=>handleToggleDropdown("salesMan")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-shopping-bag"
                        >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                            <line x1={3} y1={6} x2={21} y2={6}/>
                            <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                        <span>
                          Người bán hàng
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 512 512"
                          >
                            <path
                                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8
                          29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
                            />
                          </svg>
                        </span>
                    </a>
                    <div className={showDropdown === "salesMan" ? "dropdown-content show" : "dropdown-content"}>
                        <Link to={"/dashboard/infor"}>Thông tin cá nhân</Link>
                        <a href="#">Nhà kho</a>
                        <a href="#">Thanh toán</a>
                        <a href="#">Thống kê</a>
                        <a href="#">Xem thông báo</a>
                    </div>
                </li>}
                {(isWarehouse || isAdmin) && <li className="sidebar-list-item paste-button">
                    <a className="show-dropdown" onClick={()=>handleToggleDropdown("warehouse")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-pie-chart"
                        >
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                            <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                        </svg>
                        <span>
                          Quản lý kho
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 512 512"
                          >
                            <path
                                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8
                          29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
                            />
                          </svg>
                        </span>
                    </a>
                    <div className={showDropdown === "warehouse" ? "dropdown-content show" : "dropdown-content"}>
                        <Link to={"/dashboard/infor"}>Thông tin cá nhân</Link>
                        <a href="#">Nhà kho</a>
                        <a href="#">Nhập liệu</a>
                        <a href="#">Thống kê</a>
                        <a href="#">Xem thông báo</a>
                    </div>
                </li>}
                {(isStoreManager || isAdmin) && <li className="sidebar-list-item paste-button">
                    <a className="show-dropdown" onClick={()=>handleToggleDropdown("storeManager")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-inbox"
                        >
                            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                            <path
                                d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                        </svg>
                        <span>
                          Quản lý cửa hàng
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 512 512"
                          >
                            <path
                                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8
                          29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
                            />
                          </svg>
                        </span>
                    </a>
                    <div className={showDropdown === "storeManager" ? "dropdown-content show" : "dropdown-content"}>
                        <Link to={"/dashboard/infor"}>Thông tin cá nhân</Link>
                        <a href="#">Nhà kho</a>
                        <a href="#">Xem báo cáo</a>
                        <a href="#">Quản lý khách hàng</a>
                        <Link to={"/dashboard/employee-list"}>Quản lý nhân viên</Link>
                        <a href="#">Đăng thông báo</a>
                        <a href="#">Sao lưu/Khôi phục</a>
                    </div>
                </li>}
                <li className="sidebar-list-item">
                    <a className="show-dropdown">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-bell"
                        >
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                        <span>Tin tức</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
}
