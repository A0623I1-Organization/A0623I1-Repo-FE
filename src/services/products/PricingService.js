import axios from 'axios';
import { toast } from 'react-toastify';

export const getAll = async (page = 0) => {
    try {
        const temp = await axios.get(`http://localhost:8080/api/public/pricings?page=${page}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        toast.error("Không có sản phẩm");
        return [] 
    }
}
