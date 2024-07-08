import axios from 'axios';
import { toast } from 'react-toastify';

export const getAll = async () => {
    try {
        const temp = await axios.get("http://192.168.1.50:8080/public/pricings");
        return temp.data;
    } catch (e) {
        console.log(e)
        toast.error("Không có sản phẩm")
        return [];
    }
}