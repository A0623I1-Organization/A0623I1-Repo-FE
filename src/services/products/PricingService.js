import axios from 'axios';
import { toast } from 'react-toastify';
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllNew = async (page = 0) => {
    try {
        const temp = await axios.get(`${apiUrl}/api/public/pricings/new?page=${page}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return []
    }
}
export const getAll = async (page = 0) => {
    try {
        const temp = await axios.get(`${apiUrl}/api/public/pricings/nam-nu?page=${page}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return []
    }
}