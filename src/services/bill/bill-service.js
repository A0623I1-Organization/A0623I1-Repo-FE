import axiosInstance from '../../utils/axiosInstance';

export const createBill =async (bill)=>{
    try {
        const token = localStorage.getItem('token')
        await axiosInstance.post(`/bills`,bill,{
            headers: {Authorization: `Bearer ${token}`}
        })
    }catch (e)
    {
        console.log(e)
    }
}