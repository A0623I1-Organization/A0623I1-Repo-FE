import axios from "axios";

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
        return response.data;
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
        return response.data;
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

export const getDailySoldPricings = async(date) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/bills/sold-pricings/daily`,{
            params: {
                date: date
            }
        })
        return response.data;
    }catch(e){
        console.log(e);
    }
}

export const getMonthlySoldPricings = async(month) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/bills/sold-pricings/monthly`,{
            params: {
                month: month
            }
        })
        return response.data;
    }catch(e){
        console.log(e);
    }
}