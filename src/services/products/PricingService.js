import axios from 'axios';
import { toast } from 'react-toastify';

export const getAll = async () => {
    try {
        const temp = await axios.get("http://10.10.9.189:8080/public/pricings");
        return temp.data;
    } catch (e) {
        console.log(e)
        toast.error("Không có sản phẩm")
        return [];
    }
}