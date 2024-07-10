import axios from "axios";

const baseURL = "http://10.10.9.189:8080/api/users";

export const getAllEmployees = async (token, page, searchContent) => {
    try {
        const temp = await axios.get(`${baseURL}?page=${page}&searchContent=${searchContent}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log(temp.data);
        return temp.data.users.content;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const findEmployeeById = async (token ,id) => {
    try {
        const temp = await axios.get(`${baseURL}/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        console.log(temp.data);
        return temp.data;
    }catch(e){
        throw ("Không tìm thấy kết quả!");
    }
}

export const saveEmployee = async (employee, token) => {
    try {
        const temp = await axios.post(`${baseURL}`, employee, {
            headers: {Authorization: `Bearer ${token}`}
        })
        console.log(temp.data);
        return temp.data;
    }catch (e) {
        console.log(e)
        throw ("Không thể thêm mới!");
    }
}

export const updateEmployee = async (id, employee, token) => {
    try {
        const temp = await axios.put(`${baseURL}/${id}`, employee, {
            headers: {Authorization: `Bearer ${token}`}
        })
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw ("Không thể cập nhật!");
    }
}