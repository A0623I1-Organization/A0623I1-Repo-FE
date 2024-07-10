import axios from "axios";

const baseURL = "http://localhost:8080";

export const getTotalCustomer = async () => {
    try {
        const token = localStorage.getItem("token");
        const temp = await axios.get(`${baseURL}/api/auth/dashboard/total-customer`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        return temp.data;
    } catch (e) {
        console.log(e)
        return {};
    }
}

export const getTotalBills = async () => {
    try {
        const token = localStorage.getItem("token");
        const temp = await axios.get(`${baseURL}/api/auth/dashboard/total-bill`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        return temp.data;
    } catch (e) {
        console.log(e)
        return {};
    }
}

export const getRevenues = async (option) => {
    try {
        const token = localStorage.getItem("token");
        const temp = await axios.get(`${baseURL}/api/auth/dashboard/revenues/${option}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        return temp.data;
    } catch (e) {
        console.log(e)
        return {};
    }
}

export const getBestSalespersons = async () => {
    try {
        const token = localStorage.getItem("token");
        const temp = await axios.get(`${baseURL}/api/auth/dashboard/best-salesperson`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getNewBills = async () => {
    try {
        const token = localStorage.getItem("token");
        const temp = await axios.get(`${baseURL}/api/auth/dashboard/new-bills`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}
