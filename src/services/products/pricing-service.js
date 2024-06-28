import axios from "axios";

export const getAllPricing =async (page)=>{
    try {
        let temp = await axios.get(`http://localhost:8080/api/pricing?page=${page}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}
export const getAllPricinByProductId =async (productId,page)=>{
    try {
        let temp = await axios.get(`http://localhost:8080/api/pricing/${productId}?page=${page}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}