import React, { useEffect, useState } from 'react';
import './billForm.scss';
import QRCodeReader from './scanQr/QRCodeReader';
import CustomerModal from "./customerModal/CustomerModal";
import InvoiceModal from "./invoice/InvoiceModal";
import { DashboardMain } from "../../../../components/Dashboard/DashboardMain";
import PaymentModal from "./paymentModal/PaymentModal";
import { generateUniqueCode } from "../../../../services/bill/random_mhd";
import * as pricingService from "../../../../services/products/pricing-service"
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as billService from "../../../../services/bill/bill-service";
import {toast} from "react-toastify";
import { format } from 'date-fns';
import {useNavigate} from "react-router-dom";

// Define Yup validation schema
const schema = yup.object().shape({
    billCode: yup.string().required('Mã hóa đơn không được để trống'),
    dateCreate: yup.string().required('Ngày tạo không được để trống'),
    customer: yup.string().required("Mã khách hàng không được để trống"),
    billItemList: yup.array().of(
        yup.object().shape({
            pricing: yup.string().required('ID mặt hàng không được để trống'),
            quantity: yup.number().required('Số lượng không được để trống').min(1, 'Số lượng phải lớn hơn 0'),
        })
    ),
});

const BillForm = () => {
    const navigate = useNavigate();
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isQRCodeReaderVisible, setIsQRCodeReaderVisible] = useState(false);
    const [billItems, setBillItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [printInvoice, setPrintInvoice] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [billCode, setBillCode] = useState('');
    const [pricingCode, setPricingCode] = useState('');
    const [pricingByCode, setPricingByCode] = useState('');
    const [quantity, setQuantity] = useState('');
    const [customer, setCustomer] = useState('');

    // React Hook Form setup
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            billItemList: [],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'billItemList',
    });

    // Class BillItem definition
    class BillItem {
        constructor(id, code, name, quantity, size, price, total) {
            this.id = id;
            this.code = code;
            this.name = name;
            this.quantity = quantity;
            this.size = size;
            this.price = price;
            this.total = total;
        }
    }

    const addItem = () => {
        if (pricingByCode && pricingByCode.pricingCode && pricingByCode.pricingName && pricingByCode.size && pricingByCode.price) {
            const newItem = new BillItem(
                pricingByCode.pricingId,
                pricingByCode.pricingCode,
                pricingByCode.pricingName,
                quantity,
                pricingByCode.size,
                pricingByCode.price,
                pricingByCode.price * quantity
            );

            setBillItems([...billItems, newItem]);
            setQuantity('');
            setPricingCode('');
            setTotal(total + newItem.total);
            setFinalTotal(total + newItem.total - discount);

            append({ pricing: JSON.stringify(pricingByCode), quantity: newItem.quantity });
        } else {
            console.error('Invalid pricing data');
        }
    };
    const deleteBillItem = (index) => {
        remove(index); // This removes the item from billItemList managed by react-hook-form

        // Create a copy of billItems array
        const updatedBillItems = [...billItems];

        // Remove the item at the specified index
        updatedBillItems.splice(index, 1);

        // Update the state with the new array without the deleted item
        setBillItems(updatedBillItems);

        // Recalculate total and finalTotal if needed
        const newTotal = updatedBillItems.reduce((acc, item) => acc + item.total, 0);
        setTotal(newTotal);
        setFinalTotal(newTotal - discount);
    };


    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        setValue("dateCreate", formattedDate);

        // fetchUniqueBillCode();
    }, []);
    console.log(customer)

    const fetchUniqueBillCode = () => {
        generateUniqueCode('HD', `http://localhost:8080/api/bills/checkBillCode`)
            .then(res => {
                setBillCode(res);
                setValue('billCode', res);
            })
            .catch(err => console.log(err)
        );
    };
console.log(billCode)
console.log(customer.customerCode)
    useEffect(() => {
        fetchPricingByCode(pricingCode);
    }, [pricingCode]);

    const fetchPricingByCode = (pricingCode) => {
        if (pricingCode.trim() !== '') {
            pricingService.getPricingByPricingCode(pricingCode)
                .then(res => setPricingByCode(res))
                .catch(err => console.log(err));
        }
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openPayModal = () => setIsModalOpen(true);
    const closePayModal = () => setIsModalOpen(false);

    const callbackFunction = (childData) => setIsShowSidebar(childData);

    const onSubmit =  (data) => {
        try {
            const updatedData = {
                ...data,
                billItemList: data.billItemList.map((item,index)=>(
                    {
                        ...item,
                        pricing:JSON.parse(item.pricing)
                    }
                )),
                customer: JSON.parse(data.customer),
                dateCreate: format(new Date(data.dateCreate), 'yyyy-MM-dd'), // Định dạng ngày tháng
            };

            console.log(updatedData);
            billService.createBill(updatedData)
                .then(() => {
                    toast.success('Create Success');
                    navigate('/dashboard/payment');
                })
                .catch(err => {
                    toast.error('Create Failed');
                    console.error('Error creating product:', err);
                });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Submission Failed');
        }
    };

    const handleScan = (data) => {
        setPricingCode(data.pricingCode);
        setIsQRCodeReaderVisible(false);
    };

    const handleError = (err) => console.error(err);
    const toggleQRCodeReader = () => setIsQRCodeReaderVisible(!isQRCodeReaderVisible);

    const handlePrintInvoice = () => setPrintInvoice(true);
    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        if (method === 'cash') {
            handleSubmit(onSubmit)();
        } else {
            console.log('Đang xử lý thanh toán VNPay');
        }
    };

    const handleCustomerSelect = (selectedCustomer) => {
        setCustomer(selectedCustomer);
        setValue("customer", JSON.stringify(selectedCustomer));
    };

    return (
        <DashboardMain
            content={
                <div className="content-body">
                    <form className="bill-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="billCode">Mã hóa đơn</label>
                            <input type="text" id="billCode" disabled={true} {...register('billCode')} />
                            {errors.billCode && <span>{errors.billCode.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerCode">Mã khách hàng</label>
                            <input type="text" id="customerCode" value={customer?.customerCode || ''} disabled />
                            <button type="button" id="lookupCustomer" onClick={openModal}>Tra cứu khách hàng</button>
                            {errors.customer &&<p>{errors.customer.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Ngày tháng năm</label>
                            <input type="text" id="date"  disabled={true} {...register('dateCreate')} />
                            {errors.dateCreate && <span>{errors.dateCreate.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="itemCode">Mã hàng</label>
                            <input type="text" id="itemCode" value={pricingCode} onChange={e => setPricingCode(e.target.value)} />
                            <label htmlFor="quantity">Số lượng</label>
                            <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
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
                                    <th>Action</th>
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
                                        <td><button onClick={() => deleteBillItem(index)}>Xóa</button></td>                                    </tr>
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
                            <button type="button" id="pay" onClick={openPayModal}>Thanh toán</button>
                            <button type="button" id="printInvoice" onClick={handlePrintInvoice}>In hóa đơn</button>
                            <button type="button" id="cancel">Hủy</button>
                            <button type="submit">Submit</button>
                        </div>
                        {isQRCodeReaderVisible && <QRCodeReader handleScan={handleScan} handleError={handleError} />}
                    </form>
                    <CustomerModal isOpen={modalOpen} onClose={closeModal} getCustomer={handleCustomerSelect} />
                    <PaymentModal
                        isOpen={isModalOpen}
                        onClose={closePayModal}
                        onPaymentMethodSelect={handlePaymentMethodSelect}
                    />
                    {printInvoice && (
                        <div className="invoice-print">
                            <InvoiceModal
                                billCode={billCode}
                                customerCode={customer.customerCode}
                                billItems={billItems}
                                total={total}
                                discount={discount}
                                finalTotal={finalTotal}
                                onClose={() => setPrintInvoice(false)}
                            />
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default BillForm;
