import axios from 'axios';
import { toast } from 'react-toastify';
const apiUrl = process.env.REACT_APP_API_URL;

export const getAll = async (page = 0) => {
    try {
        const temp = await axios.get(`${apiUrl}/api/public/pricings?page=${page}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        toast.error("Không có sản phẩm");
        return []
    }
}
