import React, { useState } from 'react';
import './PromotionModal.scss';
import * as promotionService from "../../../../../services/promotion/promotion-service"; // Import SCSS file

const PromotionModal = ({ isOpen, onClose, onPayment }) => {
    const [promotionCode, setPromotionCode] = useState('');
    const [discount, setDiscount] = useState('');

    const applyPromotion = async () => {
        try {
            if (promotionCode.trim() !== '') {
                const promotion = await promotionService.usePromotionByPromotionCode(promotionCode);
                setDiscount(promotion);
            } else {
                setDiscount('');
            }
        } catch (error) {
            console.error("Failed to use promotion:", error);
        }
    };
    const handleApplyPromotion = () => {
        applyPromotion().then().catch();
    };
    const handlePayment = () => {
        onPayment(discount);
        onClose();
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal-input">
                    <label htmlFor="discountInput">Nhập mã giảm giá:</label>
                    <input
                        type="text"
                        id="discountInput"
                        value={promotionCode}
                        onChange={e => setPromotionCode(e.target.value)}
                    />
                    <button className="apply-btn" onClick={handleApplyPromotion}>Áp dụng</button>
                </div>
                <div className="modal-button">
                    <button onClick={handlePayment}>Xác nhận</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default PromotionModal;
