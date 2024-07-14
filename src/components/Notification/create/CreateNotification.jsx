import "./CreateNotification.scss";
import {useEffect, useState} from "react";
import {format} from "date-fns";
import {useForm} from "react-hook-form";
import * as notificationService from "../../../services/notification/NotificationService";
import {toast} from "react-toastify";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
export default function CreateNotification(props) {
    let ROLE_SALESMAN = "ROLE_SALESMAN";
    let ROLE_WAREHOUSE = "ROLE_WAREHOUSE";
    const [currentDateTime, setCurrentDateTime] = useState("");
    const [roles, setRoles] = useState([]);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [message,setMessage]=useState([]);



    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = format(now, "yyyy-MM-dd'T'HH:mm:ss");
            setCurrentDateTime(formattedDateTime);
        }
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalId);

    }, []);

    const handleCancel = () => {
        reset({
            createDate: currentDateTime,
            topic: '',
            content: '',
            recipient: ''
        })
    }
    const getRole = async () => {
        const token = localStorage.getItem("token");
        const role = await notificationService.getAllRole(token);
        setRoles(role);
        console.log(roles);
    };
    useEffect(() => {
        getRole();
    }, []);
    const filterRole = (data) => {
        const mapRole = new Map();
        roles.map((role) => {
            mapRole.set(role.roleName, role.roleId)
        });
        const arrayRole = [];
        if (data === 'all') {
            arrayRole.push(mapRole.get(ROLE_SALESMAN));
            arrayRole.push(mapRole.get(ROLE_WAREHOUSE));
        }
        if (data === ROLE_SALESMAN) {
            arrayRole.push(mapRole.get(ROLE_SALESMAN))
        }
        if (data === ROLE_WAREHOUSE) {
            arrayRole.push(mapRole.get(ROLE_WAREHOUSE))
        }
        console.log(arrayRole)
        return arrayRole;
    }
    const onSubmit = async data => {
        data.listRole = filterRole(data.listRole);

        const socket=new SockJS("http://localhost:8080/ws");
        const stompClient= over(socket);
        stompClient.connect({},()=>{
            stompClient.send("/app/sendNotification",{},JSON.stringify(data));
        })

        const result = await notificationService.addNewNotification(data);
        console.log('result la : ', result);
        if (result) {
            toast.success("Đăng thông báo thành công")
        } else {
            toast.error("Đăng thông báo thất bại")
        }
        handleCancel();
    }
    return (
        <div
            className="container-createNotification-nhi"
        >
            <div className="title-createNotification-nhi">
                <b className="b-tag-create-notification">ĐĂNG THÔNG BÁO</b>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">
                            <b>Ngày đăng</b>
                        </span>
                        <input className="user-details-input-nhi" defaultValue={currentDateTime} value={currentDateTime}
                               type="datetime-local"
                               readOnly={currentDateTime}
                               {...register("createDate", {required: true})} />

                    </div>
                    <div className="input-box">
                        <span className="details">
                            <b>Chủ đề</b>
                        </span>
                        <input className="user-details-input-nhi"
                               placeholder="Nhập chủ đề thông báo"
                               type="text" {...register("topic", {
                            required: true,
                            max: 50,
                            min: 2
                        })} />
                        {errors.topic && <span className="error-create-notification">* Bắt buộc nhập</span>}<br/>
                        {errors.topic && <span className="error-create-notification">* Độ dài từ 2 đến 50 ký tự</span>}
                    </div>
                    <div className="input-box">
                        <span className="details">
                            <b>Nội dung</b>
                        </span>
                        <textarea {...register("content", {required: true, max: 500, min: 0, maxLength: 500})} />
                        {errors.content && <span className="error-create-notification">* Bắt buộc nhập</span>}<br/>
                        {errors.content && <span className="error-create-notification">* Độ dài tối đa 500 ký tự</span>}<br/>
                    </div>
                    <div className="object-receive">
                        <span className="details"><b>Người nhận</b></span>
                        <div className="category">
                            <input
                                id="dot-1"
                                type="radio"
                                value={'all'}
                                {...register("listRole", {required: true})}
                            />
                            <label htmlFor="dot-1">
                                <span className="dot one"/>
                                <span className="gender">Tất cả</span>
                            </label>
                            <input
                                id="dot-2"
                                type="radio"
                                value={[ROLE_WAREHOUSE]}
                                {...register("listRole", {required: true})}
                            />
                            <label htmlFor="dot-2">
                                <span className="dot two"/>
                                <span className="gender">Quản lý kho hàng</span>
                            </label>
                            <input
                                id="dot-3"
                                type="radio"
                                value={[ROLE_SALESMAN]}
                                {...register("listRole", {required: true})}
                            />
                            <label htmlFor="dot-3">
                                <span className="dot three"/>
                                <span className="gender">Người bán hàng</span>
                            </label>
                        </div>
                        {errors.listRole &&
                            <span className="error-create-notification">* Bắt buộc chọn đối tượng gửi</span>}
                    </div>
                </div>
                <div className="button-post-notification">
                    <input
                        className="send"
                        type="submit"
                        value="Gửi"
                        onSubmit={handleSubmit(onSubmit)}
                    />
                    <input
                        className="cancel"
                        value="Hủy bỏ"
                        type="button"
                        onClick={handleCancel}
                    />
                </div>
            </form>
        </div>
    );
}
