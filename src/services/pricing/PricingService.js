import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/pricing"
});

export const getPricingList = async (token) => {
    try {
        const response = await api.get("/list", {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data); 
        return response.data; 
    } catch (error) {
        console.error("Error retrieving pricings:", error);
        throw error;
    }
}

export const createReceipt = async (token) => {
    try {
        const response = await api.get("/update", {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data); 
        return response.data; 
    } catch (error) {
        console.error("Error creating receipt:", error);
        throw error;
    }
};

export const updatePricingQuantity = async (token, warehouseReceipt) => {
    try {
        const response = await api.put("/update", warehouseReceipt, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data); 
        return response.data; 
    } catch (error) {
        console.error("Error updating pricing quantity:", error);
        throw error; 
    }
};
