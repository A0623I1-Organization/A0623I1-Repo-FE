import React, { useEffect, useState } from 'react';
import * as CustomerService from '../../../services/customer/CustomerService';

const ListCustomer = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getAllCustomers();
    }, []);

    const getAllCustomers = () => {
        CustomerService.getAllCustomers().then((response) => {
            setCustomers(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const deleteCustomer = (customerId) => {
        console.log(customerId);
        CustomerService.deleteCustomer(customerId).then((response) => {
            getAllCustomers();
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
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
