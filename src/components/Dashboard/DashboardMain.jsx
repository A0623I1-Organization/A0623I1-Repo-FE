import {HeaderDashboard} from "../Header/HeaderDashboard";
import {SidebarDashboard} from "../Sidebar/SidebarDashboard";
import {useEffect, useState} from "react";

export function DashboardMain({content, path}) {
    const [isShowSidebar, setIsShowSidebar] = useState(false);

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData)
    }

    return (
        <div className="app-container">
            <HeaderDashboard parentCallback={callbackFunction}></HeaderDashboard>
            <div id="content-wrapper">
                <SidebarDashboard showSidebar={isShowSidebar} path = {path}></SidebarDashboard>
                <div className="app-content">
                    {content}
                </div>
            </div>
        </div>
    );
}