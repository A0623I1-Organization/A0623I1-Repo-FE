import axios from "axios";

export const getAllCustomer =async (page)=>{
    try {
        let temp = await axios.get(`http://localhost:8080/api/customer?page=${page}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}