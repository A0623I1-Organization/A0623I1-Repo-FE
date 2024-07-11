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


export const getDailySalesRevenue = async(date) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/bills/revenue/daily`,{
            params: {
                date: date
            }
        })
        console.log(response.data);
    }catch(e){
        console.log(e);
    }
}

export const getMonthlySalesRevenue = async(month) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/bills/revenue/monthly`,{
            params: {
                month: month
            }
        })
        console.log(response.data);
    }catch(e){
        console.log(e);
    }
}

export const getDailySalesRevenueForMonth = async(month) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/bills/revenue/daily/month`,{
            params: {
                month: month
            }
        })
        console.log(response.data);
    }catch(e){
        console.log(e);
    }
}