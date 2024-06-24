import "./HeaderDashboard.scss";
import avatar from "./avatar.jpg";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as authenticationService from "../../services/auth/AuthenticationService";
import {jwtDecode} from "jwt-decode";


export function HeaderDashboard(props) {
    const [username, setUsername] = useState("");
    const [isShowUserMenu, setIsShowUserMenu] = useState(false);
    const [isShowSidebar, setIsShowSidebar] = useState(false);

    const navigate = useNavigate();

    useEffect(()=> {
        getUserName();
    },[])

    const getUserName = () => {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
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
                <input className="search-bar" placeholder="Search..." type="text"/>
            </div>
            {/*-------------logon-brand----------*/}
            <div className="logo-brand">
                <span>Fashion shop</span>
            </div>
            {/*-----------login-box-----------*/}
            <div className="login-btn">
                {/*------------------notification-----------------------------*/}
                <div className="layout-notif" id="btn-notification">
                    <div className="notification">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="currentColor"
                            className="bi bi-bell"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                        <span className="quantity">99</span>
                    </div>
                </div>
                {/*-----------------------------------------------*/}
                <button className="mode-switch" title="Switch Theme">
                    <svg
                        className="moon"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <defs />
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                </button>
                <div className="user-box show-dropdown" onClick={handleShowUserMenu}>
                    <div className="avatar">
                        <img
                            src={avatar}
                            alt="avatar"
                        />
                    </div>
                    <div className="username">{username}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8
    29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
                        />
                    </svg>
                </div>
                {isShowUserMenu &&
                <div className="dropdown-content">
                    <a href="#">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path
                                fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                            />
                        </svg>
                        Personal information
                    </a>
                    <a onClick={handleLogout}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-box-arrow-right"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                            />
                        </svg>
                        Log out
                    </a>
                </div>
                }
            </div>
        </header>
    );
}