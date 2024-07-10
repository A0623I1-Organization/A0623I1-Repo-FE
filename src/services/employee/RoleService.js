import axios from "axios";

const baseURL = "http://localhost:8080/api/users";

export const getAllRoles = async () => {
    try {
        const response = await axios.get(`${baseURL}/roles`);
        console.log(response.data);
        return response.data;
    }catch (e) {
        console.log(e);
        return [];
    }
};