import axiosInstance from '../../utils/axiosInstance';

export const getAllCategory =async ()=>{
    try {
        let temp = await axiosInstance.get(`/category`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}