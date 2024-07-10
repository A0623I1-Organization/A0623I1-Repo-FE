import axios from "axios";

export const getAllColor =async ()=>{
    try {
        let temp = await axios.get(`http://localhost:8080/api/color`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}