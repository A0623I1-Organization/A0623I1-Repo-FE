import axiosInstance from "../../utils/axiosInstance";

export const getAllEmployees = async (page, searchContent, codeSort, codeDirection, nameSort, nameDirection,
                                      roleSort, roleDirection) => {
    try {
        const temp = await axiosInstance.get(`/users?page=${page}&searchContent=${searchContent}` +
        `&codeSort=${codeSort}&codeDirection=${codeDirection}&nameSort=${nameSort}&nameDirection=${nameDirection}` +
        `&roleSort=${roleSort}&roleDirection=${roleDirection}`);
        console.log(temp.data);
        return temp.data.users;
    } catch (e) {
        console.log(e.response.data.message)
        throw e.response.data.message;
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
        throw e.response.data.errors;
    }
}

export const updateEmployee = async (id, employee) => {
    try {
        const temp = await axiosInstance.put(`users/${id}`, employee)
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data.errors;
    }
}

export const deleteEmployee = async (employeeId) => {
    try {
        const temp = await axiosInstance.delete(`/users/${employeeId}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data.errors;
    }
}