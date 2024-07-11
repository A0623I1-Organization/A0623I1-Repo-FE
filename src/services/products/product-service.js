import axios from "axios";

export const getAllProduct = async (keyword, sortBy, ascending, page) => {
    try {
        let url = `http://localhost:8080/api/auth/products?page=${page}`;

        // Add keyword if provided
        if (keyword) {
            url += `&keyword=${keyword}`;
        }

        // Add sortBy and ascending if provided
        if (sortBy) {
            url += `&sortBy=${sortBy}&ascending=${ascending}`;
        }


        let temp = await axios.get(url);
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e; // Re-throw the error to handle it in the calling function
    }
};

export const createProduct =async (product)=>{
    try {
        await axios.post(`http://localhost:8080/auth/api/products`,product)
    }catch (e)
    {
        console.log(e)
    }
}