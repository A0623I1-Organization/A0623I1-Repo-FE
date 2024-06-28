import React, { useEffect, useState } from 'react';
import './billForm.scss';
import { HeaderDashboard } from "../../../components/Header/HeaderDashboard";
import { SidebarDashboard } from "../../../components/Sidebar/SidebarDashboard";
import styles from "../warehouse/product/createPricing.module.scss";
import QRCodeReader from './QRCodeReader';
import * as productService from "../../../services/products/product-service";
import { toast } from "react-toastify";
import CustomerModal from "./CustomerModal";
import InvoiceComponent from "./InvoiceComponent";


const BillForm = () => {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isQRCodeReaderVisible, setIsQRCodeReaderVisible] = useState(false);
    const [billItems, setBillItems] = useState([

            {
                "code": "P001",
                "name": "Product 1",
                "quantity": 2,
                "size": "M",
                "price": 100.0,
                "total": 200.0
            },
            {
                "code": "P002",
                "name": "Product 2",
                "quantity": 1,
                "size": "L",
                "price": 150.0,
                "total": 150.0
            },
            {
                "code": "P003",
                "name": "Product 3",
                "quantity": 3,
                "size": "S",
                "price": 50.0,
                "total": 150.0
            },
            {
                "code": "P004",
                "name": "Product 4",
                "quantity": 4,
                "size": "XL",
                "price": 200.0,
                "total": 800.0
            }

    ]);
    const [total, setTotal] = useState(200000);
    const [discount, setDiscount] = useState(50000);
    const [finalTotal, setFinalTotal] = useState(150000);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [printInvoice, setPrintInvoice] = useState(false); // State to control printing invoice

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        setCurrentDate(formattedDate);
    }, []);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    const addItem = () => {
        // Logic to add item to billItems and update totals
    };

    const handleScan = (data) => {
        console.log(data);
        setIsQRCodeReaderVisible(false); // Ẩn component sau khi quét mã
    };

    const handleError = (err) => {
        console.error(err);
    };

    const toggleQRCodeReader = () => {
        setIsQRCodeReaderVisible(!isQRCodeReaderVisible);
    };

    const handlePrintInvoice = () => {
        setPrintInvoice(true); // Kích hoạt in hóa đơn
    };

    return (
        <div className="app-container">
            <HeaderDashboard parentCallback={callbackFunction} />
            <div className="content-wrapper">
                <SidebarDashboard showSidebar={isShowSidebar} />
                <div className="app-content">
                    <div className="content-body">
                        <form className="bill-form" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="billCode">Mã hóa đơn</label>
                                <input type="text" id="billCode" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerCode">Mã khách hàng</label>
                                <input type="text" id="customerCode" />
                                <button type="button" id="lookupCustomer" onClick={openModal}>Tra cứu khách hàng</button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Ngày tháng năm</label>
                                <input type="text" id="date" value={currentDate} readOnly={true} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="itemCode">Mã hàng</label>
                                <input type="text" id="itemCode" />
                                <label htmlFor="quantity">Số lượng</label>
                                <input type="number" id="quantity" />
                                <button type="button" id="addItem" onClick={addItem}>Nhập</button>
                            </div>
                            <div className="table-container">
                                <table id="billItems">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã hàng</th>
                                        <th>Tên hàng</th>
                                        <th>Số lượng</th>
                                        <th>Size</th>
                                        <th>Đơn giá</th>
                                        <th>Tổng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {billItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.code}</td>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.size}</td>
                                            <td>{item.price}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="summary">
                                <span>Tổng: <span id="total">{total}</span></span>
                                <span>Giảm giá: <span id="discount">{discount}</span></span>
                                <span>Thành tiền: <span id="finalTotal">{finalTotal}</span></span>
                            </div>
                            <div className="actions">
                                <button type="button" id="scanBarcode" onClick={toggleQRCodeReader}>Quét mã</button>
                                <button type="button" id="printInvoice" onClick={handlePrintInvoice}>In hóa đơn</button>
                                <button type="button" id="cancel">Hủy</button>
                            </div>
                            {isQRCodeReaderVisible && <QRCodeReader handleScan={handleScan} handleError={handleError} />}
                        </form>
                    </div>
                </div>
            </div>
            <CustomerModal isOpen={modalOpen} onClose={closeModal} />
            {printInvoice && (
                <div className="invoice-print">
                    <InvoiceComponent billItems={billItems} total={total} discount={discount} finalTotal={finalTotal} onClose={() => setPrintInvoice(false)} />
                </div>
            )}
        </div>
    );
};

export default BillForm;
