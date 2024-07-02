import axios from "axios";

export const createCustomer = async (item) => {
    try {
        const temp = await axios.post("http://localhost:8080/api/auth/customer/create",item);
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không thể thêm mới!")
    }
}

export const updateCustomer = async (id,item) => {
    try {
        const temp = await axios.put(`http://localhost:8080/api/auth/customer/${id}`,item);
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không thể cập nhật!")
    }
}

export const findById = async (id) => {
    try {
        const temp = await axios.get(`http://localhost:8080/api/auth/customer/${id}`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}