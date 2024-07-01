import {HeaderDashboard} from "../Header/HeaderDashboard";
import {SidebarDashboard} from "../Sidebar/SidebarDashboard";
import {useState} from "react";

export function DashboardMain({content}) {
    const [isShowSidebar, setIsShowSidebar] = useState(false);

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData)
    }

    return (
        <div className="app-container">
            <HeaderDashboard parentCallback={callbackFunction}></HeaderDashboard>
            <div id="content-wrapper">
                <SidebarDashboard showSidebar={isShowSidebar}></SidebarDashboard>
                <div className="app-content">
                    {content}
                </div>
            </div>
        </div>
    );
}