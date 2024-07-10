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
    const [notification, setNotification] = useState(null);
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
    const getItem = async (item) => {
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
            <div className="container-listNotification-nhi">
                <header className="header-notification-nhi">
                    <div className="notif_box">
                        <h2 className="title">
                            Thông báo
                            <DetailModal/>
                        </h2>
                        <span id="notifes">{listByUnRead.length}</span>
                    </div>
                    <p className="tag-p-notification" id="mark_all" onClick={markAll}>
                        Đánh dấu tất cả đã đọc
                    </p>
                </header>
                <main className="main-notification-nhi" style={{overflowY: overflow}}>
                    {
                        listByUnRead && listByUnRead.map((item, index) => (
                            <div>
                                <div key={item.notif_id} onClick={() => getItem(item)} className="notif_card unread">
                                    <img className="img-tag-notification-nhi"
                                        alt="manager--v2"
                                        height="52"
                                        src="https://img.icons8.com/3d-fluency/94/manager--v2.png"
                                        width="18"
                                    />
                                    <div className="description">
                                        <p className="user_activity tag-p-notification">
                                            <strong className="strong-tag-notification-nhi">
                                                Quản lý cửa hàng
                                            </strong>
                                            {' '} có thông báo cho bạn về {' '}
                                            <b>
                                                {item.topic}{' '}
                                            </b>
                                        </p>
                                        <p className="time tag-p-notification">
                                            {formatDistanceToNow(new Date(item.createDate), {
                                                addSuffix: true,
                                                locale: vi
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                    {
                        listByRead && listByRead.map((item, index) => (
                            <div>
                                <div key={item.notif_id} onClick={() => getItem(item)} className="notif_card">
                                    <img className="img-tag-notification-nhi"
                                        alt="manager--v2"
                                        height="52"
                                        src="https://img.icons8.com/3d-fluency/94/manager--v2.png"
                                        width="18"
                                    />
                                    <div className="description">
                                        <p className="user_activity tag-p-notification">
                                            <strong className="strong-tag-notification-nhi">
                                                Quản lý cửa hàng
                                            </strong>
                                            {' '} có thông báo cho bạn về {' '}
                                            <b>
                                                {item.topic}{' '}
                                            </b>
                                        </p>
                                        <p className="time tag-p-notification">
                                            <span>
                                                {formatDistanceToNow(new Date(item.createDate), {
                                                    addSuffix: true,
                                                    locale: vi
                                                })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                    {
                        showModal &&
                        <DetailModal notification={notification} showModal={showModal} setShowModal={setShowModal}/>
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