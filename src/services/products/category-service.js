import axios from "axios";

export const getAllCategory =async ()=>{
    try {
        let temp = await axios.get(`http://localhost:8080/api/category`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}