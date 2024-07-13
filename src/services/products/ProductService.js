import axios from 'axios';
import { toast } from 'react-toastify';
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllNew = async (page = 0) => {
    try {
        const temp = await axios.get(`${apiUrl}/api/public/product/new?page=${page}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return []
    }
}
export const getAll = async (page = 0) => {
    try {
        const temp = await axios.get(`${apiUrl}/api/public/product/nam-nu?page=${page}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return []
    }
}

export const getProductById = async (id) => {
    try {
        const temp = await axios.get(`${apiUrl}/api/public/product/${id}`);
        return temp.data;
    } catch (e) {
        console.error(e)
        return {};
    }
}