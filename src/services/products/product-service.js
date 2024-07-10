import axios from "axios";
export const getAllProduct =async (page)=>{
    try {
        let temp = await axios.get(`http://10.10.9.189:8080/api/products?page=${page}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}
export const createProduct =async (product)=>{
    try {
        await axios.post(`http://10.10.9.189:8080/api/products`,product)
    }catch (e)
    {
        console.log(e)
    }
}