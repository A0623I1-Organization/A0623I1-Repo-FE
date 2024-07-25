import axiosInstance from '../../utils/axiosInstance';

export const getAllCustomer =async (keyWord, pages = 0) => {
    try {
        const temp = await axiosInstance.get(`/customer?keyword=${keyWord}&page=${pages}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}