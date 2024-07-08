import "./ListOfNotification.scss";
import {useEffect, useState} from "react";
import * as notificationService from "../../../services/notification/NotificationService";
import {toast} from "react-toastify";
import DetailModal from "../modal/DetailModal";
import {formatDistanceToNow} from "date-fns";
import {vi} from "date-fns/locale";

export default function ListOfNotification(props) {
    const [overflow, setOverflow] = useState("hidden");
    const handleSeeAllNotification = () => {
        setOverflow(overflow === "hidden" ? "auto" : "hidden");
    }
    const [listByRead, setListByRead] = useState([]);
    const [listByUnRead, setListByUnRead] = useState([]);
    const [notification,setNotification]=useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await getAllByStatusRead(1);
            await getAllByStatusRead(0);
        };
        fetchData();
    }, []);
    const getAllByStatusRead = async (statusRead) => {
        const token = localStorage.getItem("token");
        const temp = await notificationService.getAllByStatusRead(token, statusRead);
        if (statusRead) {
            setListByRead(temp);
        } else {
            setListByUnRead(temp);
        }
    }


    const markAll = async () => {
        const token = localStorage.getItem("token");
        const response = await notificationService.markAllRead(token);
        await getAllByStatusRead(1);
        await getAllByStatusRead(0);
        if (response) {
            toast.success("Đánh dấu đã đọc tất cả thành công ")
        } else {
            toast.error("Tất cả đã được đọc rồi nhé !")
        }


    }
    const getItem =async (item) => {
        const token = localStorage.getItem("token");
        console.log("notifId:", item.notifId);
        setNotification(item);
        setShowModal(true);
        await notificationService.seeViewDetail(token, item.notifId);
        await getAllByStatusRead(1);
        await getAllByStatusRead(0);
    }


    return (
        <>
            <div className="container">
                <header>
                    <div className="notif_box">
                        <h2 className="title">
                            Notifications
                            <DetailModal/>
                        </h2>
                        <span id="notifes">{listByUnRead.length}</span>
                    </div>
                    <p id="mark_all" onClick={markAll}>
                        Mark all as read
                    </p>
                </header>
                <main style={{overflowY: overflow}}>
                    {
                        listByUnRead && listByUnRead.map((item, index) => (
                            <div >
                                <div key={item.notif_id} onClick={()=>getItem(item)} className="notif_card unread">
                                    <img
                                        alt="manager--v2"
                                        height="52"
                                        src="https://img.icons8.com/3d-fluency/94/manager--v2.png"
                                        width="18"
                                    />
                                    <div className="description">
                                        <p className="user_activity">
                                            <strong>
                                                Store Manager
                                            </strong>
                                            {' '}remind you of {' '}
                                            <b>
                                                {item.topic}{' '}
                                            </b>
                                        </p>
                                        <p className="time">
                                            1m ago
                                        </p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                    {
                        listByRead && listByRead.map((item, index) => (
                            <div >
                                <div key={item.notif_id} onClick={()=>getItem(item)} className="notif_card">
                                    <img
                                        alt="manager--v2"
                                        height="52"
                                        src="https://img.icons8.com/3d-fluency/94/manager--v2.png"
                                        width="18"
                                    />
                                    <div className="description">
                                        <p className="user_activity">
                                            <strong>
                                                Store Manager
                                            </strong>
                                            {' '}remind you of {' '}
                                            <b>
                                                {}
                                                {item.topic}{' '}
                                            </b>
                                        </p>
                                        <p className="time">
                                            <span>{formatDistanceToNow(new Date(item.createDate), {
                                                addSuffix: true,
                                                locale: vi
                                            })}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                    {
                        showModal && <DetailModal notification={notification} showModal={showModal} setShowModal={setShowModal}/>
                    }


                </main>
                <div className="see-all-button">
                    <button onClick={handleSeeAllNotification}>
                        See all notifications
                    </button>
                </div>
            </div>
        </>
    )
}