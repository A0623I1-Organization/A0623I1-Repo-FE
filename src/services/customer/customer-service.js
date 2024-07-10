import axiosInstance from '../../utils/axiosInstance';

export const getAllCustomer =async (page)=>{
    try {
        let temp = await axiosInstance.get(`/customer?page=${page}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}