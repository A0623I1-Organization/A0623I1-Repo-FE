import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
const apiUrl = process.env.REACT_APP_API_URL;

export const createNews = async (item) => {
    try {
        const temp = await axiosInstance.post(`/news/create`, item);
        return temp.data;
    } catch (error) {
        throw error.response.data.errors;
    }
}

export const getAllNews = async (page) => {
    try {
        const temp = await axios.get(`${apiUrl}/api/public/news?page=${page}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}