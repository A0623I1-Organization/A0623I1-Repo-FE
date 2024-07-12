import axiosInstance from "../../utils/axiosInstance";

export const createBill =async (bill)=>{
    try {
        const token = localStorage.getItem('token')
        await axiosInstance.post(``,bill,{
            headers: {Authorization: `Bearer ${token}`}
        })
    }catch (e)
    {
        console.log(e)
    }
}


export const getDailySalesRevenue = async(date) => {
    try {
        const response = await axiosInstance.get(`/bills/revenue/daily`,{
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
        const response = await axiosInstance.get(`/bills/revenue/monthly`,{
            params: {
                month: month
            }
        })
        return response.data;
    }catch(e){
        console.log(e);
    }
}

export const getDailySalesRevenueForMonth = async (month) => {
    try {
        const response = await axiosInstance.get('/bills/revenue/daily/month', {
            params: {
                month: month,
            },
        });
        return response.data;
    } catch (e) {
        console.error(e);
        return [];
    }
};


export const getDailySoldPricings = async(date) => {
    try {
        const response = await axiosInstance.get(`/bills/sold-pricings/daily`,{
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
        const response = await axiosInstance.get(`/bills/sold-pricings/monthly`,{
            params: {
                month: month
            }
        })
        return response.data;
    }catch(e){
        console.log(e);
    }
}