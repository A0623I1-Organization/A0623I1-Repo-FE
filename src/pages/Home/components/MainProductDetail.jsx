import styles from './MainProductDetail.module.scss';
import { useState, useEffect } from 'react';
import * as ProductService from '../../../services/products/ProductService';
import { useParams } from 'react-router-dom';

function MainProductDetail(props) {
    const [product, setProduct] = useState();
    const [currentPricing, setCurrentPricing] = useState();
    const { productId } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const response = await ProductService.getProductById(productId);
        console.log(response);
        setProduct(response);
        setCurrentPricing(response.pricingList[0]); // Set phần tử đầu tiên của pricingList làm mặc định
    };

    const handlePricingChange = (index) => {
        setCurrentPricing(product.pricingList[index]);
    };

    return (
        <main id={styles.main}>
            <section className={styles.sectionOne}>
                <div className={styles.item}>
                    <img src={product?.productImages[0].imageUrl} alt="" />
                </div>
                <div className={styles.item}>
                    <b>{product?.productName}</b>
                    <p>Mã sản phẩm: {currentPricing?.pricingCode}</p>
                    <p>Size: {currentPricing?.size}</p>
                    <p>Màu: {currentPricing?.color.colorName}</p>
                    <p>Số lượng còn lại: {currentPricing?.quantity}</p>
                    <p>Giá: {currentPricing?.price.toLocaleString()} VND</p>
                    <>
                        <p>Danh sách sản phẩm:</p>
                        <div className={styles.listSize}>
                            {product?.pricingList.map((pricing, index) => (
                                <button 
                                    key={pricing.pricingId} 
                                    onClick={() => handlePricingChange(index)} 
                                    className={`${styles.itemSize} ${currentPricing === pricing ? styles.active : ''}`}
                                >
                                    {product?.productName} size {pricing.size} màu {pricing.color.colorName}
                                </button>
                            ))}
                        </div>
                    </>
                </div>
            </section>
        </main>
    );
}

export default MainProductDetail;
