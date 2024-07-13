import axiosInstance from '../../utils/axiosInstance';

export const getAllCategory =async ()=>{
    try {
        let temp = await axiosInstance.get(`/category`)
        console.log(temp.data)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}