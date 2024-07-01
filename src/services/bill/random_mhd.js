import axios from "axios";

export const generateBillCode = (prefix) => {
    const suffix = Math.floor(100000 + Math.random() * 900000).toString();
    return prefix + suffix;
};

export const checkUniqueCode = async (url,code) => {
    try {
        const temp = await axios.post(url, { code: code });
        console.log(temp.data.isUnique)
        return temp.data.isUnique;
    } catch (error) {
        console.error('Error checking code uniqueness:', error);
        return false;
    }
};
export const generateUniqueCode = async (prefix,url) => {
    let unique = false;
    let code;

    while (!unique) {
        code = generateBillCode(prefix);
        unique = await checkUniqueCode(url,code);
    }

    return code;
};