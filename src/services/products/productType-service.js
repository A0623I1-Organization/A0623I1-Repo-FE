import axios from "axios";

export const getAllProductTypeByCategory =async (categoryName)=>{
    try {
        let temp = await axios.get(`http://192.168.1.50:8080/api/productType?categoryName=${categoryName}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}
export const getAllProductType =async ()=>{
    try {
        let temp = await axios.get(`http://192.168.1.50:8080/api/productType`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}