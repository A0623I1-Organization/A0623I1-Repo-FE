import axios from "axios";

export const getAllColor =async ()=>{
    try {
        let temp = await axios.get(`http://10.10.9.189:8080/api/color`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}