import axios from "axios";

export const getAllCategory =async ()=>{
    try {
        let temp = await axios.get(`http://192.168.1.50:8080/api/category`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}