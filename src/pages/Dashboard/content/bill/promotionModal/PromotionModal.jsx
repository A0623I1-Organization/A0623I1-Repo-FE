// DiscountModal.jsx
import React, {useEffect, useState} from 'react';
import './PromotionModal.scss';
import * as promotionService from "../../../../../services/promotion/promotion-service"; // Import SCSS file

const PromotionModal = ({ isOpen, onClose ,onPayment}) => {
    const [promotionCode, setPromotionCode] = useState('')
    const [discount, setDiscount] = useState('')
    useEffect(() => {
        getPromotionByPromotionCode(promotionCode)
    }, [promotionCode]);
    const getPromotionByPromotionCode =(code)=>{
        promotionService.getPromotionByPromotionCode(code).then(res=>{
            setDiscount(res)
        }).catch(err=>console.log(err))
    }
    const handlePayment = (discount) => {
        onPayment(discount);
        onClose();
    };
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal-input">
                    <label htmlFor="discountInput">Nhập mã giảm giá:</label>
                    <input type="text" id="discountInput" onChange={e=>setPromotionCode(e.target.value)} />
                    <button className="apply-btn">Áp dụng</button>
                </div>
                <div className="modal-button">
                    <button onClick={() => handlePayment(discount)}>
                        Xác nhận
                    </button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default PromotionModal;
