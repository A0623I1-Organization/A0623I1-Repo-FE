import axios from "axios";
import {jwtDecode} from "jwt-decode";

const baseURL = "http://localhost:8080";

export const login = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/auth/authenticate`, data)
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const register = async (userData) => {
    try{
        const response = await axios.post(`${baseURL}/auth/register`, userData)
        return response.data;
    }catch(err){
        throw err;
    }
}

export const getAllUsers = async (token) =>{
    try{
        const response = await axios.get(`${baseURL}/api/users`,
            {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data;
    }catch(err){
        throw err;
    }
}


export const getYourProfile = async (token) => {
    try{
        const response = await axios.get(`${baseURL}/auth/get-profile`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        console.log(response.data)
        return response.data;
    }catch(err){
        console.log(err)
        throw err;
    }
}

export const getUserById = async (userId, token) =>{
    try{
        const response = await axios.get(`${baseURL}api/users/${userId}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        return response.data;
    }catch(err){
        throw err;
    }
}

export const deleteUser = async (userId, token) =>{
    try{
        const response = await axios.delete(`${baseURL}/api/users/${userId}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        return response.data;
    }catch(err){
        throw err;
    }
}


export const updateUser = async (userData, token) => {
    try{
        const userId = userData.userId;
        const response = await axios.put(`${baseURL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        console.log(response.data)
        return response.data;
    }catch(err){
        throw err;
    }
}

export const updatePasswordUser = async (userData, token) => {
    try{
        const userId = userData.userId;
        const response = await axios.put(`${baseURL}/auth/update-password/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        console.log(response)
        return response.data;
    }catch(err){
        console.log(err)
        err.message = "Cập nhật mật khẩu thất bại!"
        throw err;
    }
}

/**AUTHENTICATION CHECKER */
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('fullName')
}

export const isAuthenticated = () =>{
    const token = localStorage.getItem('token');
    return !!token
}

export const isAdmin = () =>{
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    return decodedToken.roles === 'ROLE_ADMIN';
}

export const isWarehouse = () =>{
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    return decodedToken.roles === 'ROLE_WAREHOUSE';
}

export const isSalesMan = () =>{
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    return decodedToken.roles === 'ROLE_SALESMAN';
}

export const isStoreManager = () =>{
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    return decodedToken.roles === 'ROLE_MANAGER';
}

export const adminOnly = () =>{
    return this.isAuthenticated() && this.isAdmin();
}