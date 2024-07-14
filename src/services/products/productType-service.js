import axiosInstance from '../../utils/axiosInstance';

export const getAllProductTypeByCategory =async (categoryName)=>{
    try {
        let temp = await axiosInstance.get(`/productType?categoryName=${categoryName}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}
export const getAllProductType =async ()=>{
    try {
        let temp = await axiosInstance.get(`/productType`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}