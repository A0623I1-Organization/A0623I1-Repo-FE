import axios from "axios";

export const createBill =async (bill)=>{
    try {
        await axios.post(`http://localhost:8080/api/bills`,bill)
    }catch (e)
    {
        console.log(e)
    }
}