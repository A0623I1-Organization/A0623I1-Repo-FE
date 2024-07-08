import {DashboardMain} from "../../../components/Dashboard/DashboardMain";
import ListOfNotification from "../../../components/Notification/list/ListOfNotification";

export function NotificationList(props) {
    return (
        <>
            <DashboardMain content={<ListOfNotification/>}/>
        </>
    )
}