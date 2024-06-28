import React from 'react';
import './InvoiceComponent.scss';

const InvoiceComponent = ({ storeName, invoiceNumber, customerName, date, products, discount, total, onClose }) => {
    const handlePrint = () => {
        // Lấy nội dung của invoice để in
        const invoiceContent = document.getElementById('invoice-content').innerHTML;

        // Tạo một cửa sổ in mới
        const printWindow = window.open('', '_blank');

        // Đặt nội dung của cửa sổ in là nội dung của invoice
        printWindow.document.write(`
            <html>
            <head>
                <title>Fashion</title>
                <style>
                    /* Thêm CSS để chỉnh trang in */
                    body {
                        font-family: Arial, sans-serif;
                    }
            
                    .invoice {
                        width: 80%;
                        margin: 20px auto;
                        border: 1px solid #ccc;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    /* Thêm CSS cho các phần tử trong invoice */
                    .invoice-header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .invoice-customer {
                        margin-bottom: 20px;
                    }
                    .invoice-products {
                        margin-bottom: 20px;
                    }
                    .invoice-summary {
                        text-align: right;
                    }
                </style>
            </head>
            <body>
                ${invoiceContent}
            </body>
            </html>
        `);

        // Đóng việc ghi nội dung
        printWindow.document.close();

        // In cửa sổ in
        printWindow.print();
    };

    return (
        <div className="invoice-modal">
            <div id="invoice-content">
                <div className="invoice-header">
                    <h2>{storeName}</h2>
                    <p>Mã hóa đơn: {invoiceNumber}</p>
                </div>
                <div className="invoice-customer">
                    <p>Khách hàng: <span>{customerName}</span></p>
                    <p>Ngày: <span>{date}</span></p>
                </div>
                <div className="invoice-products">
                    <h3>Sản phẩm đã mua:</h3>
                    {products && products.length > 0 ? (
                        <ul>
                            {products.map((product, index) => (
                                <li key={index}>
                                    <p><strong>{product.name}</strong></p>
                                    <p>Giá: {product.price}</p>
                                    <p>Số lượng: {product.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có sản phẩm nào trong hóa đơn.</p>
                    )}
                </div>
                <div className="invoice-summary">
                    <p>Tổng tiền: {total}</p>
                    <p>Giảm giá: {discount}</p>
                    <p>Thành tiền: {total - discount}</p>
                </div>
            </div>
            <div className="invoice-actions">
                <button onClick={handlePrint}>In hóa đơn</button> {/* Nút in */}
                <button onClick={onClose}>Đóng</button> {/* Nút đóng */}
            </div>
        </div>
    );
};

export default InvoiceComponent;
