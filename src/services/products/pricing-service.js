import axios from "axios";

export const getAllPricing =async (page)=>{
    try {
        let temp = await axios.get(`http://192.168.1.50:8080/api/pricing/all?page=${page}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}
export const getAllPricingByProductId = async (productId,page)=>{
    try {
        let temp = await axios.get(`http://192.168.1.50:8080/api/pricing/byProductId/${productId}?page=${page}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}
export const getPricingByPricingCode = async (pricingCode) => {
    try {
        const temp = await axios.get(`http://192.168.1.50:8080/api/pricing/byCode`, {
            params: {
                pricingCode: pricingCode
            }
        });
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}
