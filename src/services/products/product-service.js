import axiosInstance from '../../utils/axiosInstance';
export const getAllProduct = async (keyword, sortBy, ascending, page) => {
    try {
        let url = `/products?page=${page}`;

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
        throw e.response.data.message;
    }
};

export const createProduct =async (product)=>{
    try {
        await axiosInstance.post(`/products`,product)
    }catch (e)
    {
        console.log(e)
    }
}
export const deleteProduct = async (productId)=>{
    try {
        const temp = await axiosInstance.delete(`products/${productId}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return null;
    }

}