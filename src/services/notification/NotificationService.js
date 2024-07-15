import axios from "axios";
// const baseURL = "http://localhost:8080/api/auth/notification";
export const getAllNotification = async () => {
    const token = localStorage.getItem("token");
    try {
        const temp = await axios.get(`http://localhost:8080/api/auth/notification/list`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}
export const getAllByStatusRead = async (statusRead) => {
    const token = localStorage.getItem("token");
    try {
        const temp = await axios.get(`http://localhost:8080/api/auth/notification/listByStatusRead/${statusRead}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}

export const markAllRead = async () => {
    const token = localStorage.getItem("token");
    try {
        const temp = await axios.get(`http://localhost:8080/api/auth/notification/markAllRead`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}
export const seeViewDetail = async (notifId) => {
    const token = localStorage.getItem("token");
    try {
        const temp = await axios.get(`http://localhost:8080/api/auth/notification/getInfoNotification/${notifId}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
    }
}
export const getAllRole = async () => {
    const token = localStorage.getItem("token");
    try {
        const roles = await axios.get("http://localhost:8080/api/users/roles", {
            headers: {Authorization: `Bearer ${token}`}
        });
        return roles.data;

    } catch (e) {
        console.log(e);
    }
};
export const addNewNotification = async (data) => {
    const token = localStorage.getItem("token");
    try {
        const temp = await axios.post("http://localhost:8080/api/auth/notification/create", data, {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log('trong tang service :',temp.data)
        return temp.data;

    } catch (e) {
        console.log(e);
    }
}
