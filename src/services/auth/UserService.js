import axios from "axios";
import {jwtDecode} from "jwt-decode";

const baseURL = "http://10.10.9.189:8080";

export const updateAvatarAndBackgroundImage = async (username, avatar, backgroundImage) => {
    try {
        const userData = {
            username: username,
            avatar: avatar,
            backgroundImage: backgroundImage
        }
        const token = localStorage.getItem("token");
        const response = await axios.patch(`${baseURL}/auth/update-image`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        return response.data;
    } catch (error) {
        error.message = "Cập nhật hình ảnh thất bại!"
        throw error;
    }
}