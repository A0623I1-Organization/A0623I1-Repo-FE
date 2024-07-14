import {HeaderDashboard} from "../Header/HeaderDashboard";
import {SidebarDashboard} from "../Sidebar/SidebarDashboard";
import {useState} from "react";
import "./DashboardMain.scss";
import ListOfNotification from "../Notification/list/ListOfNotification";

export function DashboardMain({content}) {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [showNotificationList, setShowNotificationList] = useState(false);

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };
    const displayNotification = (event) => {
        event.stopPropagation(); // Ngăn sự kiện click lan đến phần tử cha
        setShowNotificationList(prevState => !prevState);
    };

    const turnOffNotification = () => {
        if (showNotificationList) {
            setShowNotificationList(false);
        }
    };

    return (
        <div className="app-container" onClick={turnOffNotification}>
            <HeaderDashboard parentCallback={callbackFunction} onClick={displayNotification}></HeaderDashboard>
            {showNotificationList && (
                <div className="overlay-nhi" onClick={(event) => event.stopPropagation()}>
                    <div className="notification-content-header-nhi">
                        <ListOfNotification
                            widthList={"100%"}
                            backgroundColorList={"white"}
                            marginTopList={"-10px"}
                            marginList={"-10px -20px"}
                            paddingList={"10px"}
                            heightList={"550px"}
                            fontSizeHeader={"15px"}
                            heightMain={"400px"}
                            seeAllBackgroundColor={"white"}
                        />
                    </div>
                </div>
            )}
            <div id="content-wrapper">
                <SidebarDashboard showSidebar={isShowSidebar}></SidebarDashboard>
                <div className="app-content">
                    {content}
                </div>
            </div>
        </div>
    );
}
