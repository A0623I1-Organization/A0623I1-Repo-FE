import axiosInstance from '../../utils/axiosInstance';

export const getAllColor =async ()=>{
    try {
        let temp = await axiosInstance.get(`/color`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}