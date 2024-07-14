import "./HeaderDashboard.scss";
import avatar from "./avatar.jpg";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as authenticationService from "../../services/auth/AuthenticationService";
import {jwtDecode} from "jwt-decode";
import {TiArrowSortedDown} from "react-icons/ti";
import {FaRegBell} from "react-icons/fa";
import {FaRegUserCircle} from "react-icons/fa";
import {FaCloudMoon} from "react-icons/fa";
import {IoIosLogOut} from "react-icons/io";
import {getAllByStatusRead} from "../../services/notification/NotificationService";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {isSalesMan, isWarehouse} from "../../services/auth/AuthenticationService";

export function HeaderDashboard(props) {
    const [fullName, setFullName] = useState("");
    const [isShowUserMenu, setIsShowUserMenu] = useState(false);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [darkmode, setDarkmode] = useState(false);
    const navigate = useNavigate();
    const [quantityUnread, setQuantityUnread] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/notification', (message) => {
                    getQuantityNotificationUnread();
                }
            )
        });
        setStompClient(stompClient);
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        }
    }, []);

    useEffect(() => {
        getUserName();
        getQuantityNotificationUnread();
        }, [])
    const getQuantityNotificationUnread = async () => {
        const temp = await getAllByStatusRead(0);
        if (temp.length > 99) {
            setQuantityUnread("99+")
        }
        setQuantityUnread(temp.length);
    };

    const getUserName = () => {
        const fullName = localStorage.getItem('fullName')
        setFullName(fullName);
    }

    const handleShowUserMenu = () => {
        setIsShowUserMenu(!isShowUserMenu);
    }

    const handleShowSidebar = () => {
        setIsShowSidebar(!isShowSidebar);
        props.parentCallback(isShowSidebar);
    }

    const handleLogout = () => {
        authenticationService.logout();
        navigate("/login");
    }

    const handleDarkMode = () => {
        setDarkmode(!darkmode);
        if (darkmode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }
    return (
        <header className="dashboard-header">
            <div className="btn-bar" onClick={handleShowSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0
  256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0
  17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                    />
                </svg>
            </div>
            <div className="search-header">
                <input className="search-bar" placeholder="tìm kiếm..." type="text"/>
            </div>
            {/*-------------logon-brand----------*/}
            <div className="logo-brand">
                <span>Luxury shop</span>
            </div>
            {/*-----------login-box-----------*/}
            <div className="login-btn">
                {/*------------------notification-----------------------------*/}
                {
                    (isSalesMan() || isWarehouse()) && (
                        <div className="layout-notif" id="btn-notification" onClick={props.onClick}>
                            <div className="notification">
                                <FaRegBell size={27}/>
                                <span className="quantity">{quantityUnread}</span>
                            </div>
                        </div>
                    )
                }
                <div className="user-box show-dropdown" onClick={handleShowUserMenu}>
                    <div className="avatar">
                        <img
                            src={avatar}
                            alt="avatar"
                        />
                    </div>
                    <div className="username">{fullName}</div>
                    <TiArrowSortedDown/>
                </div>
                {isShowUserMenu &&
                    <div className="dropdown-content">
                        <div className="user-full-name">
                            <div className="avatar">
                                <img
                                    src={avatar}
                                    alt="avatar"
                                />
                            </div>
                            {fullName}
                        </div>
                        <a href="#">
                            <FaRegUserCircle/>
                            Thông tin cá nhân
                        </a>
                        <a className="mode-switch" title="Switch Theme" onClick={handleDarkMode}>
                            <FaCloudMoon/>
                            Chế độ màn hình tối
                        </a>
                        <a onClick={handleLogout}>
                            <IoIosLogOut/>
                            Đăng xuất
                        </a>
                    </div>
                }
            </div>
        </header>
    );
}