import axiosInstance from '../../utils/axiosInstance';

export const getAllPricingByProductId = async (productId,keyword, sortBy, ascending, page) => {
    try {
        if  (page === undefined) {
            page = '';
        }
        let url = `/pricing/all/${productId}?page=${page}`;

        // Add keyword if provided
        if (keyword) {
            url += `&keyword=${keyword}`;
        }

        // Add sortBy and ascending if provided
        if (sortBy) {
            url += `&sortBy=${sortBy}&ascending=${ascending}`;
        }


        let temp = await axiosInstance.get(url);
        return temp.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
export const getAllPricinByProductId =async (productId,page)=>{
    try {
        let temp = await axiosInstance.get(`/pricing/byProductId/${productId}?page=${page}`)
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}
export const getPricingByPricingCode = async (pricingCode) => {
    try {
        const temp = await axiosInstance.get(`/pricing/byCode`, {
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
