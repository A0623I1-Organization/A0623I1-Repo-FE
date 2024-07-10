import axios from "axios";

// const baseURL = "http://localhost:8080/api/auth/notification";


export const getAllNotification = async (token) => {
    try {
        const temp = await axios.get(`http://localhost:8080/api/auth/notification/list`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
        return "Error fetching data";
    }
}
export const getAllByStatusRead = async (token, statusRead) => {
    try {
        const temp = await axios.get(`http://localhost:8080/api/auth/notification/listByStatusRead/${statusRead}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
        return "Error fetching data";
    }
}

export const markAllRead = async (token) => {
    try {
        const temp = await axios.get(`http://localhost:8080/api/auth/notification/markAllRead`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
        return "Error fetching data";
    }
}
export const seeViewDetail = async (token, notifId) => {
    try {
        const temp = await axios.get(`http://localhost:8080/api/auth/notification/getInfoNotification/${notifId}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;
    } catch (e) {
        console.log(e);
        return "Error fetching data";
    }
}
export const getAllRole = async (token) => {
    try {
        const roles = await axios.get("http://localhost:8080/api/users/roles", {
            headers: {Authorization: `Bearer ${token}`}
        });
        return roles.data;

    } catch (e) {
        console.log(e);
        return "Error fetching data";
    }
};
export const addNewNotification = async (token,data) => {
    try {
        const temp = await axios.post("http://localhost:8080/api/auth/notification/create",data, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return temp.data;

    } catch (e) {
        console.log(e);
        return "Error fetching data";
    }
}

