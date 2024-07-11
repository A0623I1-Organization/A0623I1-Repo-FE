import "./sidebarDashboard.scss";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as authenticationService from "../../services/auth/AuthenticationService";
import { MdDashboard } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { MdPointOfSale } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { PiNewspaperClippingBold } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";


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
                    <Link className="show-dropdown" to={"/dashboard"}>
                        <MdDashboard/>
                        <span>Trang quản lý</span>
                    </Link>
                </li>
                {(isSalesMan || isAdmin) && <li className="sidebar-list-item paste-button active">
                    <a className="show-dropdown" onClick={() => handleToggleDropdown("salesMan")}>
                        <MdPointOfSale/>
                        <span>
                          Người bán hàng
                          <TiArrowSortedDown />
                        </span>
                    </a>

                    <div className={showDropdown === "salesMan" ? "dropdown-content" : "dropdown-content show"}>
                        <Link to={"/dashboard/infor"}>Thông tin cá nhân</Link>
                        <Link to={"/dashboard/warehouse"}>Nhà kho</Link>
                        <Link to={"/dashboard/payment"}>Thanh toán</Link>
                        <a href="#">Thống kê</a>
                        <a href="#">Xem thông báo</a>
                    </div>
                </li>}
                {(isWarehouse || isAdmin) && <li className="sidebar-list-item paste-button">
                    <a className="show-dropdown" onClick={() => handleToggleDropdown("warehouse")}>
                        <FaWarehouse/>
                        <span>
                          Quản lý kho
                          <TiArrowSortedDown />
                        </span>
                    </a>
                    <div className={showDropdown === "warehouse" ? "dropdown-content" : "dropdown-content show"}>
                        <Link to={"/dashboard/infor"}>Thông tin cá nhân</Link>
                        <Link to={"/dashboard/warehouse"}>Nhà kho</Link>
                        <Link to={"/dashboard/import-pricings"}>Nhập liệu</Link>
                        <a href="#">Thống kê</a>
                        <a href="#">Xem thông báo</a>
                    </div>
                </li>}
                {(isStoreManager || isAdmin) && <li className="sidebar-list-item paste-button">
                    <a className="show-dropdown" onClick={() => handleToggleDropdown("storeManager")}>
                        <GrUserManager/>
                        <span>
                          Quản lý cửa hàng
                          <TiArrowSortedDown />
                        </span>
                    </a>
                    <div className={showDropdown === "storeManager" ? "dropdown-content " : "dropdown-content show"}>
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
                        <PiNewspaperClippingBold/>
                        <span>Tin tức</span>
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <Link className="show-dropdown" to="/">
                        <FaHome />
                        <span>Trang chủ</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
