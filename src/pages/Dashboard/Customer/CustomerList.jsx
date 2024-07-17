<<<<<<< HEAD
import React from 'react';

function CustomerList(props) {
    return (
        <div>
            <h2>Đây là trang danh sách khách hàng</h2>
        </div>
    );
}

export default CustomerList;
=======
import React, { useEffect, useState } from 'react';
import * as CustomerService from '../../../services/customer/CustomerService';

const ListCustomer = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getAllCustomers();
    }, []);

    const getAllCustomers = async () => {
        try {
            const response = await CustomerService.getAllCustomers();
            setCustomers(response);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteCustomer = async (customerId) => {
        try {
            await CustomerService.deleteCustomer(customerId);
            getAllCustomers();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="container">
            <h2>Customer Manager</h2>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Customer Code</th>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>Point</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    customers.map((customer, index) =>
                        <tr key={customer.customerCode}>
                            <td>{index + 1}</td>
                            <td>{customer.customerCode}</td>
                            <td>{customer.customerName}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.accumulatedPoints}</td>
                            <td>{customer.customerType.typeName}</td>
                            <td>
                                <button onClick={() => deleteCustomer(customer.customerId)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default ListCustomer;
>>>>>>> 95916011a60869e8f9c25138efd8c3948576e2b5
