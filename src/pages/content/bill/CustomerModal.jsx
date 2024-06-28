// CustomerModal.js

import React, {useEffect, useState} from 'react';
import './CustomerModal.scss'

const CustomerModal = ({ isOpen, onClose,getCustomerId }) => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');

    const customersPerPage = 4;
    useEffect(() => {
        fetchCustomers()
    }, [currentPage,searchInput,customers]);
    const fetchCustomers = () => {

        let mockCustomers = [
            { id: 231, name: "Nguyễn Văn A", phone: "098234212" },
            { id: 234, name: "Nguyễn Văn C", phone: "093777777" },
            { id: 864, name: "Tôn Nữ D", phone: "037212121" },
            { id: 333, name: "Đoàn Thị E", phone: "023456789" },
            { id: 432, name: "Lê Văn F", phone: "012345678" },
            { id: 543, name: "Trần Thị G", phone: "098765432" }
        ];

        if (searchInput) {
            mockCustomers = mockCustomers.filter(customer =>
                customer.id.toString().includes(searchInput) ||
                customer.name.includes(searchInput) ||
                customer.phone.includes(searchInput)
            );
        }

        setCustomers(mockCustomers);
        setCurrentPage(1);
    };

    const displayCustomers = () => {
        const startIndex = (currentPage - 1) * customersPerPage;
        const endIndex = Math.min(startIndex + customersPerPage, customers.length);

        return customers.slice(startIndex, endIndex).map((customer, index) => (
            <tr key={customer.id} onClick={() => handleRowClick(customer.id)}>
                <td>{startIndex + index + 1}</td>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
            </tr>
        ));
    };

    // Function to handle row click
    const handleRowClick = (id) => {
        alert("Selected customer ID: " + id);
        onClose(); // Close modal after selection
    };

    return (
        <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Tra cứu khách hàng</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Nhập mã KH, tên KH hoặc Sdt"
                    />
                    <button onClick={fetchCustomers}>Chọn</button>
                </div>
                <table id="tableId">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã khách hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Số điện thoại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayCustomers()}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => prev > 1 ? prev - 1 : prev)}>Trước</button>
                    <span>Page {currentPage}</span>
                    <button onClick={() => setCurrentPage(prev => prev < Math.ceil(customers.length / customersPerPage) ? prev + 1 : prev)}>Tiếp</button>
                </div>
            </div>
        </div>
    );
};

export default CustomerModal;
