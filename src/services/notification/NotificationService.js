
import axiosInstance from '../../utils/axiosInstance';
export const getAllNotification = async () => {
    try {
        const temp = await axiosInstance.get(`http://localhost:8080/api/auth/notification/list`);
        return temp.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}
export const getAllByStatusRead = async (statusRead) => {
    try {
        const temp = await axiosInstance.get(`http://localhost:8080/api/auth/notification/listByStatusRead/${statusRead}`);
        return temp.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const markAllRead = async () => {
    try {
        const temp = await axiosInstance.get(`http://localhost:8080/api/auth/notification/markAllRead`);
        return temp.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}
export const seeViewDetail = async (notifId) => {
    try {
        const temp = await axiosInstance.get(`http://localhost:8080/api/auth/notification/getInfoNotification/${notifId}`);
        return temp.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}
export const getAllRole = async () => {
    try {
        const roles = await axiosInstance.get("http://localhost:8080/api/auth/users/roles");
        return roles.data;
    } catch (e) {
        console.log(e);
        return [];
    }
};
export const addNewNotification = async (data) => {
    try {
        const temp = await axiosInstance.post("http://localhost:8080/api/auth/notification/create", data);
        console.log('trong tang service :', temp.data)
        return temp.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}