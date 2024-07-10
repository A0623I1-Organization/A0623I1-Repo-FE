import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const createBill =async (bill)=>{
    try {
        const token = localStorage.getItem('token')
        await axios.post(`http://localhost:8080/api/auth/bills`,bill,{
            headers: {Authorization: `Bearer ${token}`}
        })
    }catch (e)
    {
        console.log(e)
    }
}