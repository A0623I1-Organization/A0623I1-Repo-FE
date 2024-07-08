import axios from "axios";

export const getPromotionByPromotionCode = async (promotionCode) => {
    try {
        const temp = await axios.get(`http://localhost:8080/api/promotions?promotionCode=${promotionCode}`, promotionCode);
        return temp.data;
    }catch (e)
    {
        console.log(e)
    }
}
