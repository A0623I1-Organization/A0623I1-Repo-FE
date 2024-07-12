import axiosInstance from "../../utils/axiosInstance";

export const getAllEmployees = async (page, searchContent) => {
    try {
        const temp = await axiosInstance.get(`/users?page=${page}&searchContent=${searchContent}`)
        console.log(temp.data);
        return temp.data.users.content;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const findEmployeeById = async (id) => {
    try {
        const temp = await axiosInstance.get(`/users/${id}`)
        console.log(temp.data);
        return temp.data;
    }catch(e){
        throw ("Không tìm thấy kết quả!");
    }
}

export const saveEmployee = async (employee) => {
    try {
        const temp = await axiosInstance.post(`/users`, employee)
        console.log(temp.data);
        return temp.data;
    }catch (e) {
        console.log(e)
        throw ("Không thể thêm mới!");
    }
}

export const updateEmployee = async (id, employee) => {
    try {
        const temp = await axiosInstance.put(`users/${id}`, employee)
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw ("Không thể cập nhật!");
    }
}