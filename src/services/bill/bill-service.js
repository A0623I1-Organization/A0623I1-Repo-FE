import axios from "axios";

export const createBill =async (bill)=>{
    try {
        await axios.post(`http://localhost:8080/api/bills`,bill)
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