import axios from "axios";

export const getAllCustomer =async (page)=>{
    try {
        let temp = await axios.get(`http://10.10.9.189:8080/api/auth/customer?page=${page}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}