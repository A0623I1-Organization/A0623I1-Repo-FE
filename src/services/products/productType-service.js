import axios from "axios";

export const getAllProductTypeByCategory =async (categoryName)=>{
    try {
        let temp = await axios.get(`http://localhost:8080/api/productType?categoryName=${categoryName}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}